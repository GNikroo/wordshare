import { createContext, useContext, useEffect, useState } from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { followHelper, unfollowHelper } from '../utils/utils';

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        followingProfiles: { results: [] },
    });

    const currentUser = useCurrentUser();

    const handleFollow = async (clickedProfile) => {
        try {
            const { data } = await axiosRes.post('/followers/', {
                followed: clickedProfile.id,
            });

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        followHelper(profile, clickedProfile, data.id)
                    ),
                },
                followingProfiles: {
                    ...prevState.followingProfiles,
                    results: prevState.followingProfiles.results.map(
                        (profile) =>
                            followHelper(profile, clickedProfile, data.id)
                    ),
                },
            }));
        } catch (err) {
            // console.log(err);
        }
    };

    const handleUnfollow = async (clickedProfile) => {
        try {
            await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        unfollowHelper(profile, clickedProfile)
                    ),
                },
                followingProfiles: {
                    ...prevState.followingProfiles,
                    results: prevState.followingProfiles.results.map(
                        (profile) => unfollowHelper(profile, clickedProfile)
                    ),
                },
            }));
        } catch (err) {
            // console.log(err);
        }
    };

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    `/profiles/?owner__followed__owner__profile=${currentUser.profile_id}`
                );
                setProfileData((prevState) => ({
                    ...prevState,
                    followingProfiles: data,
                }));
            } catch (err) {
                // console.log(err);
            }
        };
        if (currentUser) {
            handleMount();
        }
    }, [currentUser]);

    return (
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider
                value={{ setProfileData, handleFollow, handleUnfollow }}
            >
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};

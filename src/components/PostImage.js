import React from 'react';

const PostImage = ({ src, title, height, width = 100, text }) => {
    return (
        <span>
            <img
                src={src}
                height={height}
                width={width}
                alt={title}
            />
            {text}
        </span>
    );
};

export default PostImage;

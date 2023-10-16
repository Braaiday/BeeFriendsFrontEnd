import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { EmojiSmile } from 'react-bootstrap-icons';

const ElementEmojiPicker = ({ onEmojiClick, messageInputRef }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    
    return (
        <div className='ElementEmojiPicker'>
            {showEmojiPicker &&
                <div className='emoji-picker'>
                    <EmojiPicker
                        onEmojiClick={(event, emojiObject) => {
                            setShowEmojiPicker(!showEmojiPicker);
                            onEmojiClick(event);
                        }}
                    />
                </div>
            }
            <EmojiSmile
                className='smile-icon'
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                size={30}
            />
        </div>
    )
}

export default ElementEmojiPicker
import React, {useState, useEffect, useContext} from 'react';
import send from '../../assets/Send_hor_fill.png';
import {GameContext} from '../../context/gameContext';
import {Channel} from 'pusher-js';

interface ChatProps {
  chatIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleChat: () => void;
}

const Chat: React.FC<ChatProps> = ({chatIsOpen, toggleChat}) => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);
    const {gameManager, opponentName} = useContext(GameContext);
    const channel: Channel | null = gameManager.getGameChannel();

    useEffect(() => {
        channel?.bind('client-message', (message: string) => {
            const opponentMessage = opponentName + ': ' + message;
            setMessages((prevMessages) => [...prevMessages, opponentMessage]);
        });

    }, [])

    const sendMessage = () => {
        channel?.trigger('client-message', message);
        const myMessage = 'you: ' + message;
        setMessages((prevMessages) => [...prevMessages, myMessage]);
        setMessage("");
    };

    const seeChat = {
        display: chatIsOpen ? 'inline-block' : 'none',
    };


    return (
        <div
            className='w-full h-full absolute md:w-[30%] md:max-w-[300px] md:my-8 md:h-[90%] border-2 border-primary bg-secondary rounded-3xl md:relative p-4 overflow-auto text-sm z-50'
            style={seeChat}>
            {messages.map((message, index) => (
                <p key={index} className='text-left text-gray-300 mb-2'>
                    {message}
                </p>
            ))}
            <div className='absolute top-0 right-0 text-3xl m-4 cursor-pointer' onClick={toggleChat}>{">"}</div>
            <div className='absolute bottom-4 right-1/2 translate-x-1/2 w-[80%]'>
                <input
                    type="text"
                    className='w-full h-[50px] border-2 border-primary bg-secondary rounded-3xl pl-4 pr-12'
                    placeholder='Type a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            sendMessage()
                        }
                    }}>
                </input>
                <img onClick={sendMessage} src={send} alt=""
                     className='absolute w-[30px] h-[30px] top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'/>
            </div>
        </div>
    );
};

export default Chat;

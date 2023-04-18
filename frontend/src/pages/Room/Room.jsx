import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useParams, useHistory } from 'react-router-dom';
import { getRoom } from '../../http';
import AddRoomModal from '../../components/AddSummary/AddSummary';

import styles from './Room.module.css';

const Room = () => {
    const user = useSelector((state) => state.auth.user);
    const { id: roomId } = useParams();
    const [room, setRoom] = useState(null);

    // const { clients, provideRef, handleMute, localStream } = useWebRTC(
    //     roomId,
    //     user
    // );

    const { clients, provideRef, handleMute } = useWebRTC(roomId, user);

    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [isMuted, setMuted] = useState(true);

    useEffect(() => {
        const fetchRoom = async () => {
            const { data } = await getRoom(roomId);
            setRoom((prev) => data);
        };

        fetchRoom();
    }, [roomId]);

    useEffect(() => {
        handleMute(isMuted, user.id);
    }, [isMuted]);

    const handManualLeave = () => {
        history.push('/rooms');
    };

    const handleMuteClick = (clientId) => {
        if (clientId !== user.id) return;
        setMuted((prev) => !prev);
    };


    function openModal() {
        setShowModal(true);
    }

    return (
        <div>
            <div className="container">
                <button onClick={handManualLeave} className={styles.goBack}>
                    <img src="/images/arrow-left.png" alt="arrow-left" />
                    <span>All voice rooms</span>
                </button>
            </div>
            <div className={styles.clientsWrap}>
                <div className={styles.header}>
                    {room && <h2 className={styles.topic}>{room.topic}</h2>}
                    <div className={styles.actions}>
                    
                        <button
                            onClick={openModal}
                            className={styles.actionBtn}
                        >
                            <img
                                src="/images/close.png"
                                alt="add-room"
                            />
                            <span>Close Group  </span>
                        </button>
                    
                       
                        <button className={styles.actionBtn}>
                            <img src="/images/palm.png" alt="palm-icon" />
                        </button>
                        <button
                            onClick={handManualLeave}
                            className={styles.actionBtn}
                        >
                            <img src="/images/win.png" alt="win-icon" />
                            <span>Leave quietly</span>
                        </button>
                        <button
                            onClick={handManualLeave}
                            className={styles.actionBtn}
                        >
                            <img src="/images/chat-bubble.png" alt="win-icon" />
                            <span>Chat</span>
                        </button>
                    </div>
                    
                </div>
                {/* <div className={styles.pop}>
                    <span>Are you sure you want to mute Sanyukta ??</span>
                    <div className={styles.button}>
                    <button className={styles.actionBtn}>Yes</button>
                    <button className={styles.actionBtn}>No</button>
                    </div>
                </div> */}
                <div >
                                    {/* <div className={styles.message}>
                                        {/* <span className={styles.sender}>Sanyukta:</span> 
                                        Hello !&nbsp;&nbsp;&nbsp;&nbsp;
                                        <img src="/images/dustbin.png" alt="win-icon"  width="14" height="14"/> */}
                                    {/* </div> */}
                                    {/* <div className={styles.message2}>
                                        <span className={styles.sender}>You:</span> 
                                        Hey Piyush, how's it going?
                                    </div> */}
                </div>
                <div className={styles.clientsList}>
                    {clients.map((client) => {
                        return (
                            <div className={styles.client} key={client.id}>
                                <div className={styles.userHead}>
                                    <img
                                        className={styles.userAvatar}
                                        src={client.avatar}
                                        alt=""
                                    />
                                    <audio
                                        autoPlay
                                        playsInline
                                        ref={(instance) => {
                                            provideRef(instance, client.id);
                                        }}
                                    />
                                    <button
                                        onClick={() =>
                                            handleMuteClick(client.id)
                                        }
                                        className={styles.micBtn}
                                    >
                                        {client.muted ? (
                                            <img
                                                className={styles.mic}
                                                src="/images/mic-mute.png"
                                                alt="mic"
                                            />
                                        ) : (
                                            <img
                                                className={styles.micImg}
                                                src="/images/mic.png"
                                                alt="mic"
                                            />
                                        )}
                                    </button>
                                </div>
                                

                            </div>
                        );
                    })}
                </div>
            </div>
            {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}

        </div>
    );
};

export default Room;

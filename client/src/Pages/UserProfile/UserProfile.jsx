import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './UsersProfile.css'

const UserProfile = () => {

    const { id } = useParams()
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)
    const [Switch, setSwitch] = useState(false)


    const [details, setDetails] = useState(null)
    const getUserGeolocationDetails = () => {
        fetch("https://geolocation-db.com/json/2725d960-5eef-11ed-9b62-857a2b26943e")    
        .then( response => response.json() )
        .then( data => setDetails( data ) );
    }


    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className='user-details'>
                            <Avatar backgroundColor="purple" color='white' fontSize='50px' px='40px' py='30px'>
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            ) 
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                            ) : (
                                <ProfileBio currentProfile={currentProfile}/>
                            )
                        }
                    </>
                    <p className="mt-3">
                        <button className="primary-btn" onClick={getUserGeolocationDetails}>
                            Find my details
                        </button>

                        <div className="row">
                            <div className="cols">
                                { details && <ul className="list-grp">
                                    <li className="list-grp-itm">
                                        Location : {`${details.city}, ${details.country_name}(${details.country_code})`}
                                    </li>
                                    <li className="list-grp-itm">IP : {details.IPv4}</li>
                                </ul>
                                    }
                            </div>
                        </div>
                    </p>
                </section>
            </div>
        </div>
    )
}

export default UserProfile
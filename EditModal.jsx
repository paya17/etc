import React, {useState, useEffect, useRef} from 'react';
import "./EditModal.css"
import {CameraIcon,DeleteIcon} from '../Icons';
import axios from "axios";
import CoverImg from '../../assets/images/coverImg.jpg'
import ProfileImg from '../../assets/images/profileImg.jpg'

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

const EditModal = ({currentName, isOpenModal, setIsOpenModal}) => { // 상위컴포넌트(PostInfos)에서 props 받아옴
    const [nameInputs, setNameInputs] = useState('');
    const [bioInputs, setBioInputs] = useState('');


    const wrapperRef = useRef();

    useEffect(()=>{
      document.addEventListener('mousedown', handleClickOutside);
      return()=>{
        document.removeEventListener('mousedown', handleClickOutside);
      }
    })                        
    const handleClickOutside=(event)=>{
      if (wrapperRef && !wrapperRef.current.contains(event.target)) {
        setIsOpenModal(false);
      }
      else {
        setIsOpenModal(true);
      }
    }
    
    const editInfo = async () => {
        console.log(currentName.valueOf())
        console.log(nameInputs)
        console.log(bioInputs)
        const response = await axios.put(`${PROXY}/users/1`,
        {
            "nickname" : nameInputs,
            "identifier" : "testIdentifier",
            "bio": bioInputs	
        }) // submit→'db'에 있는 걸 수정
        .catch(e => console.log(response))
        setNameInputs('');
        setBioInputs('');
        setIsOpenModal(false);
      }

      const deleteTweetModal = () => {setIsOpenModal(false);}
  

    return (
        <div ref={wrapperRef} value={isOpenModal} className="editModal">
              <div className='editinfo__header'>
                <div className='editinfo__header__left'>
                  <button className='editbutton' onClick={deleteTweetModal}>{DeleteIcon}</button>
                  <div className='editText'>프로필 수정</div>
                </div>
                <button outline type="submit" onClick={editInfo} className="savebutton"> {/* 이벤트->함수, *type="submit" */}
                    저장
                </button>
              </div>

              <div className='coverimgAll'>
                <img className="editmodal__coverimg" src={CoverImg} alt="cover" />
                <div className='covercamera'>{CameraIcon}</div>
              </div>
              <div className='profileimgAll'>
                <img className="editmodal__profileimg" src={ProfileImg} alt="profile"/>
                <div className='profilecamera'>{CameraIcon}</div>
              </div>



              <div className='editinfo'>
                  <input
                  onChange={(e) => setNameInputs(e.target.value)} //이벤트->함수(바로)->state업데이트
                  value={nameInputs} //state
                  placeholder="이름"
                  type="text"
                  className="nameinfo"
                  required
                  />

                  <input
                  onChange={(e) => setBioInputs(e.target.value)} //이벤트->함수(바로)->state업데이트
                  value={bioInputs} //state
                  placeholder="자기소개"
                  type="text"
                  className="bioinfo"
                  />

                  <input
                  placeholder="위치"
                  text="text"
                  className='locationinfo'
                  />

                  <input
                  placeholder="웹사이트"
                  text="text"
                  className='websiteinfo'
                  />
              </div>
        </div>
    );
};

export default EditModal;
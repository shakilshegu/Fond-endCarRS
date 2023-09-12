import React from "react";
import Header from "../../components/User/Header/header";
import Home from "../../components/User/Home/Home";
import Footer from "../../components/User/Footer/Footer";
import Hero from "../../components/User/Hero/Hero";
import Cards from "../../components/User/Cards/Cards";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import {useNavigate} from "react-router-dom"

function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const Handle = ()=>{
    if(token){
      navigate('/Chats')
    }else{
      navigate("/login")
    }
  }

  return (
    <>
      <div>
        <Header />
        <Hero />
        <Home />
        <Cards />
        <div className="bg-[#00df9a] flex justify-center items-center  fixed w-24 h-24 rounded-full end-[60px] bottom-5">
          <BsFillChatLeftTextFill className="w-[50px] h-[50px]" onClick={Handle} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;

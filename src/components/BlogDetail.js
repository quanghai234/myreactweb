import axios from '../api/products'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import images from '../images'
import { toast } from 'react-toastify'


const BlogDetail = () => {
    const [detail,setDetail] = useState({});
    const [recent,setRecent] = useState([]);
    const [commentList,setCommentList] = useState([]);

    const local = useLocation()
   
    const [displayname,setDisplayName] = useState('');
    const [avatar,setAvatar] = useState('');
    const [comment,setComment] = useState('');

    useEffect(()=>{
       const getComment = async()=>{
           await axios.get(`/comment?createIn=${local.state}`)
           .then(resp=>setCommentList(resp.data))
           .catch(err=>console.log(err))
       }
       const getBlogDetail = async()=>{
           await axios.get('blog/'+local.state)
           .then(resp=>setDetail(resp.data))
           .catch(err=>console.log(err))
        }
        const getRecent = async()=>{
            await axios.get('blog')
            .then(resp=>setRecent(resp.data))
            .catch(err=>console.log(err))
        }
        getBlogDetail()
        getRecent()
        getComment()
        setDisplayName(localStorage.getItem('displayname'))
        setAvatar(localStorage.getItem('useravatar'))
    },[local.state])

   const showDate = new Date()
   
   const logged = localStorage.getItem('logged')

   const handleComment =async(e)=>{
    e.preventDefault()
   if(logged==null){
    toast.error("Must login to comment",
    {
        position: "top-left",
        })
    }else{
       await axios.post('/comment',
        { 
            createIn:local.state,
            createAt:showDate.toDateString(),
            createBy:displayname,
            createrimg:avatar,
            purport:comment
        })
        .then(resp=>setCommentList([...commentList,resp.data]))
        .catch(err=>console.log(err))
    }
   }

   
  
  return (
    <>
        <div className="container">
           
        <div className="blog-detail">
            <div className="blog">
            <div className="blog-box">
                <div className="blog-img">
                <img src={detail.blogimg} alt="#" />
                </div>
                <div className="meta-icon">
                    <div className="calendar">
                        <i className="fa-solid fa-calendar-days" />
                        <p>March 13,2022</p>
                    </div>
                    <div className="view">
                        <i className="fa-solid fa-eye" />
                        <p>233 View</p>
                    </div>
                </div>
                <div className="content-text">
                <h2 className="blog-detail-title">
                    {detail.header}
                </h2>
                <p className="text-block">
                    {detail.content}
                </p>
                <div className="img-block">
                    <div className="img-box">
                    <img src={images[4]} alt="#" />
                    </div>
                    <div className="img-box">
                    <img src={images[2]} alt="#" />
                    </div>
                </div>
               
                </div>
            </div>
            <div className="comment-area">
                <div className="single-comment">
                <div className="comment-title">
                    <h3>Comments</h3>
                </div>
                { commentList===[] ?
                <div className="comment-box" >
                 </div> :
                commentList.map((com)=>{
                    return <div className="comment-box" key={com.id}>
                    <div className="comment-img">
                    <img src={com.createrimg} alt="#" />
                    </div>
                    <div className="comment-contain">
                    <div className="comment-name">
                        <h4>{com.createBy}</h4>
                    </div>
                    <div className="comment-date">
                        <span>{com.createAt}</span>
                    </div>
                    <div className="desc">
                        <p>
                        {com.purport}
                        </p>
                    </div>
                    </div>
                </div>
                })}
                </div>
            </div>
            <div className="comment-form">
                <div className="comment-area">
                <div className="comment-title">
                    <h3>Leave a Comments</h3>
                </div>
                <form className="comment-form" onSubmit={(e)=>handleComment(e)} >
                    <textarea placeholder="Your Message" rows={5} defaultValue={""} onChange={e=>setComment(e.target.value)} />
                    <button >POST COMMENT</button>
                </form>
                </div>
            </div>
            </div>
            <div className="recent-post">
            <div className="post-wrap">
                <div className="post-title">
                <h3>Recent Post</h3>
                </div>
                {
                    recent.filter((blg)=>blg.id!==local.state).slice(0,4).map((blog)=>{
                        return <div className="post-blog" key={blog.id}>
                <div className="post-img">
                    <img src={blog.blogimg} alt="#" />
                </div>
                <div className="post-desc">
                    <Link to="/blog-detail" state={blog.id}>
                    <h5>{blog.header}</h5>
                    </Link>
                    <div className="post-meta">
                    <i className="fa-solid fa-calendar-days" />
                    <span>March, 2022</span>
                    </div>
                </div>
                                </div>
                    })
                }
            </div>
            </div>
        </div>
        </div>

    </>
  )
}

export default BlogDetail
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from '../api/products'
import ReactPaginate from 'react-paginate'


const Blog = () => {

  const [blog,setBlog] = useState([]);

  useEffect(()=>{
    getData()
  },[])

  const getData = async()=>{
    await axios.get('/blog')
    .then(resp=>setBlog(resp.data))
    .catch(err=>console.log(err))
  }

  const [pageNum,setPageNum] = useState(0)

  const prodPerPage = 6
  const curPage = pageNum*prodPerPage

  const pageCount = Math.ceil(blog.length / prodPerPage)
  const changePage = ({selected})=>{
    setPageNum(selected)
  }

  return (
    <>
    <div className="container">
      <div className="blog-content-area">
        <div className="blog-area">
          {
            blog.slice(curPage,curPage+prodPerPage).map((blog,indx)=>{
              return  <div className="blog-content" key={indx}>
                
              <div className="blog-img-box">
                <Link to='/blog-detail' state={blog.id}>
                  <img src={blog.blogimg} alt="Blog " />
                </Link>
              </div>
              <div className="blog-info">
                <div className="blog-meta">
                  <div className="meta">
                    <i className="fa fa-calendar-days" />
                    <p>22 Jun 2022</p>
                  </div>
                  <div className="meta">
                    <i className="fa fa-eye" />
                    <p>200 views</p>
                  </div>
                </div>
                <div className="blog-name">
                  <Link to='/blog-detail' state={blog.id}>
                      <h4>{blog.header}</h4>
                  </Link>
                </div>
                
                <div className="blog-desc">
                  <p>
                    {blog.content}
                  </p>
                </div>
                <div className="btn-link">
                  <Link to='/blog-detail' state={blog.id}>
                    READ MORE
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            })
          }
        </div>
        <div className="under-control">
          <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"page-control"}
                disabledClassName={"pagination-disable"}
                activeClassName={"pagination-active"}
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default Blog
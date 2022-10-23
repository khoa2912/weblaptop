import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductPage } from '../../../actions'
import getParams from '../../../utils/getParams'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import  Card  from '../../../components/UI/Card';
import { LayoutAccount } from '../../../components/Layout/layoutAcount';
import { Layout } from '../../../components/Layout';
/**
* @author
* @function ProductStore
**/

export const ProductStore = (props) => {

  const dispatch = useDispatch()
  const product = useSelector(state => state.product)
  const {page}=product
  console.log(product)
  useEffect(() => {
    const params = getParams(props.location.search)
    const payload = {

      params
    }
    dispatch(getProductPage(payload))
    console.log(payload)
  }, [])
  return (
    <Layout>
    <div style={{margin:'0 10px'}}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={()=>{}}>
        {
          page.banners && page.banners.map((banner,index)=>
            <a key={index} href={banner.navigateTo } style={{display:'block'}}>
              <img src={banner.img} alt=""></img>
              <p className="legend">Legend</p>
            </a>
          )
        }
      </Carousel>
      <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',margin:'10px 0'}}>
        {
          page.products && page.products.map((product,index)=>
            <Card key={index} style={{width:'400px', height:'200px', margin:'0 5px'}}>
              
              <img style={{ width:'100%',height:'100%'}} src={product.img} alt=""></img>
            </Card>
          )
        }
      </div>
    </div>
    </Layout>
  )

}
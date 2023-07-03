import { useCallback } from 'react';
import ShippingForm from './ShippingForm'

export default function ProductPage({ productId, theme}) {

    const handleSubmit = useCallback(() => {
    //   console.log(productId)
      setTimeout(()=>{console.log('111')},2000)
      console.log('handle called')
      console.log(productId)
    }, [productId]);

    return ( 
        <div>
            <ShippingForm handle={handleSubmit} />
            <h2>{theme}</h2>
        </div>
    )
}
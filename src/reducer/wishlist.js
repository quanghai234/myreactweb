import {toast} from 'react-toastify'

 const initialState ={
    wishlist:[]
 }

 const WishListRedux =(state=initialState,action)=>{
    switch (action.type){
        case 'ADD_TO_WISHLIST':           
        const IteamIndex = state.wishlist.findIndex((pr)=> pr.id === action.payload.id);

        if(IteamIndex >= 0){
            toast.success(`${action.payload.name} already in Wishlist`,{
                position:'bottom-left',
            });
            return {
            ...state,
            wishlist:[...state.wishlist]
            }

        }else{
            toast.success(`${action.payload.name} added to Wishlist`,{
                position:'bottom-left',
            });
             return {
                ...state,
                wishlist: [...state.wishlist,action.payload]
            }
        }

        case 'DELETE_WISHLIST':
            toast.info('product has been remove from Wishlist',{
                position:'top-center',
                autoClose: 1000,
                hideProgressBar: true,
            });
            return{
                ...state,
                wishlist:state.wishlist.filter(item=>item.id!==action.payload)
            }
      
        default :
          return state
          
    }   
 }

 export default WishListRedux;
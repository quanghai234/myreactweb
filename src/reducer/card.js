import {toast} from 'react-toastify'

 const initialState ={
    card:[]
 }

 const CardRedux =(state=initialState,action)=>{
    switch (action.type){
        case 'ADD_TO_CART':           
        const IteamIndex = state.card.findIndex((pr)=> pr.id === action.payload.id);

        if(IteamIndex >= 0){
            state.card[IteamIndex].quantity += action.payload.quantity
            toast.success(`increased ${action.payload.name} quantity`,{
                position:'bottom-right',
            });
            return {
            ...state,
            card:[...state.card]
            }
        }else{
            toast.success(`${action.payload.name} added to cart`,{
                position:'bottom-right',
            });
             return {
                ...state,
                card: [...state.card,action.payload]
            }
        }

        case 'DELETE_CART':
            toast.info('product has been remove',{
                position:'top-center',
                autoClose: 1000,
                hideProgressBar: true,
            });
            return{
                ...state,
                card:state.card.filter(item=>item.id!==action.payload)
            }

        case 'UPDATE_CART':
            const updateItem = state.card.findIndex((pr)=> pr.id === action.payload.id);
            state.card[updateItem].quantity = parseInt( action.payload.update)
            toast.info('Product quantity has change',{
                position:'top-center',
               
            });
            return{
                ...state,
                card:[...state.card]
            }
        case 'PAY':
            toast.success('Payment Successful',{
                position:'top-center',
            });
            return{
                ...state,
                card:[]
            }

        default :
          return state
          
    }   
 }

 export default CardRedux;
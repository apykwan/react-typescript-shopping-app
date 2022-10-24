import { Button, Stack } from 'react-bootstrap'

import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from '../context/ShoppingCartContext'

type CartItemProps = {
    id: number
    quantity: number
    style: {}
}

export function CartItem ({ id, quantity, style }: CartItemProps) {
    const { removeFromCart } = useShoppingCart()

    const item = storeItems.find(item => item.id === id)

    if (item == null) return null;

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img 
                src={item.imgUrl} 
                alt={item.name} 
                style={{
                    ...style, 
                    width: "125px", 
                    height: "75px", 
                    objectFit: "cover" ,
                    boxShadow: "5px 5px 2.5px #ccc"
                }} 
            />

            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {quantity > 1 && <span className="text-muted" style={{ fontSize: ".65rem"}}>x{quantity}</span>}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>
                {formatCurrency(item.price * quantity)}
            </div>
            <Button variant="outline-danger" size="sm" onClick={removeFromCart.bind(null, item.id)}>
                &times;
            </Button>
        </Stack>
    )

}
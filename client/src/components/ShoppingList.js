import React, { useState } from 'react'
import uuid from 'uuid'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'


const ShoppingList = () => {
  const [items, setItems] = useState([
    {id: uuid(), name: "Eggs"},
    {id: uuid(), name: "Milk"},
    {id: uuid(), name: "Water"},
    {id: uuid(), name: "Steak"}
  ])

  return (
    <div>
      <Container>
        <Button 
          color='dark'
          className='mb-2'
          onClick={() => {
            const name = prompt('Enter Item')
            if (name) {
              setItems(items.concat({id: uuid(), name}))
            }
          }}
        >
          Add Item
        </Button>
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({id, name}) => (
              <CSSTransition key={id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button 
                    className='mr-2' 
                    color='danger'
                    size='sm'
                    onClick={() => {
                      setItems(items.filter(item => item.id !== id))
                    }}
                  >&times;</Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    </div>
  )
}

export default ShoppingList
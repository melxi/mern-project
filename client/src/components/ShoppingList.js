import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'


const ShoppingList = (props) => {    
  useEffect(() => {
    props.getItems();
  }, [])
  
  const { items } = props.item

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {items.map(({id, name}) => (
            <CSSTransition key={id} timeout={500} classNames='fade'>
              <ListGroupItem>
                <Button 
                  className='mr-2' 
                  color='danger'
                  size='sm'
                  onClick={() => props.deleteItem(id)}
                >&times;</Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    item: state.item
  }
}

const mapDispatchToProps = {
  getItems,
  deleteItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)
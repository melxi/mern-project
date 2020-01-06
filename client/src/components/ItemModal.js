import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'
import {
	Button,
	Container,
	Modal, 
	ModalHeader, 
	ModalBody, 
	Form,
	FormGroup,
	Input,
	Label
} from 'reactstrap'

const ItemModal = (props) => {
	const [name, setName] = useState('')
	const [modal, setModal] = useState(false)

	const toggle = () => setModal(!modal)

	const onChange = (event) => {
		setName([event.target.name] = event.target.value)
	}

	const onSubmit = event => {
		event.preventDefault()

		if(name) {
			const newItem = {
				name
			}

			props.addItem(newItem)
			setName('')
			toggle()
		}
	}

	return (
		<Container>
			<Button
				className="mb-2"
				color='dark'
				onClick={toggle}
			>
        Add Item
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
				<ModalBody>
					<Form onSubmit={onSubmit}>
						<FormGroup>
							<Label for='item'>Item</Label>
							<Input
								type='text'
								name='name'
								id='item'
								onChange={onChange}
							></Input>
							<Button
								className='mt-3'
								color='dark'
								block
							>Add Item</Button>
						</FormGroup>
					</Form>
				</ModalBody>
			</Modal>
		</Container>
	)
}

const mapDispatchToProps = {
	addItem
}

export default connect(null, mapDispatchToProps)(ItemModal)
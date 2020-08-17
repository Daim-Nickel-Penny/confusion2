import React,{Component} from 'react'
import { Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem
    ,Row,Col,Label, Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom'


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const RenderComments = ({ comments }) => {

    function sayHello() {
        alert('Hello!');
      }
      
    return(
        <div >
        <div >
            <h4>Comments</h4> 
            <ul className="list-unstyled" >
            {comments.map(comment =>
                <div key={comment.id}>
                <li>{comment.comment}</li>
                <p>-- {comment.author}, { new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </div>
            )}
            </ul>
        
            <CommentForm/>
           
    
        </div>
        </div>
    )
}   



const RenderDish = ({ dish }) => {
    return(
        <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
)
}



const Dishdetail = (props) => {
return(
    <div className="container">
        <div className="row" >
        <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row" >
                    <div className='col-12 col-md-5 m-1'>
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );

        
    }

    class CommentForm extends Component{
    

        constructor(props){
            super(props);
            this.state = {
                isModalOpen:false
              };
      
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this); 
        }
    
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }
          handleSubmit(values) {
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
          
        }
       
    
    
    
        render(){
            return(<div>
                      <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Content</ModalHeader>
                        <ModalBody>
    
    
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        

                        <Row className="form-group">
                                <Label htmlFor="rating" md={3}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" name="Rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
    
                            <Row className="form-group">
                                        <Label htmlFor="name" md={3}>Your Name</Label>
                                        <Col md={10}>
                                            <Control.text model=".name" id="name" name="name"
                                                placeholder="Your Name"
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                                />
                                            <Errors
                                                className="text-danger"
                                                model=".firstname"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                <Label htmlFor="Comment" md={3}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".Comment" id="Comment" name="Comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>

                                
                                    <Row className="form-group">
                                        <Col md={{size:10, offset: 2}}>
                                            <Button type="submit" color="primary">
                                            Send Feedback
                                            </Button>
                                        </Col>
                                    </Row>
                                </LocalForm>

        
    
    
    
                        </ModalBody>
                    </Modal>
    
    
    
            </div>);
    
        }
    }
    

export default Dishdetail;
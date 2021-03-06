var React = require('react')
var NavBar = require('./NavBar')
var Login = require('./Login')
var Register = require('./Register')
var Modal = require('./Modal')
var MyProducts = require('./MyProducts')
var Products = require('./Products')
var NearbyProducts = require('./NearbyProducts')
var MyWishlist = require('./MyWishlist')
var FormGroup = require('react-bootstrap/lib/FormGroup')
var FormControl = require('react-bootstrap/lib/FormControl')
var Button = require('react-bootstrap/lib/Button')
var Col = require('react-bootstrap/lib/Col')
var Row = require('react-bootstrap/lib/Row')
var Grid = require('react-bootstrap/lib/Grid')

var App = React.createClass({
	getInitialState: function() {
        return {
            logueado: (localStorage.getItem('token') != undefined),
						myProducts: false,
						nearbyProducts: false,
						wishlist: false,
						allProducts: true,
						registered: false,
            mensaje: '',
            data: [],
						datafavourite: [{products: []}],
						count: 0
        }
   },
   //Metodos para que otros componentes puedan cambiar el estado del principal
   login() {
      this.setState({logueado: true, mensaje: ''});
   },
   logout() {
      this.setState({logueado: false, mensaje: 'Has cerrado la sesión ¡Hasta pronto!'});
   },
	 OnMyProducts() {
		 this.setState({myProducts: true, allProducts: false, nearbyProducts: false, wishlist: false})
	 },
	 OnAllProducts() {
		 this.setState({allProducts: true, myProducts: false, nearbyProducts: false, wishlist: false})
	 },
	 OnNearbyProducts() {
		 this.setState({nearbyProducts: true, myProducts: false, allProducts: false, wishlist: false})
	 },
	 OnWishlist() {
		 this.setState({wishlist: true, nearbyProducts: false, myProducts: false, allProducts: false})
	 },
	 addWishlist() {
		 this.setState({preferred: !this.state.preferred})
	 },
   setMensaje(m) {
   	  this.setState({mensaje: m});
   },
   mensajeLeido() {
   	  this.setState({mensaje: ''});
   },
   setData(data) {
      this.setState({data: data});
   },

	 setFavouriteData(datafavourite) {
		 this.setState({datafavourite: datafavourite})
	 },

	 registerUser() {
		 this.setState({registered: true})
	 },

	 createUserSuccess() {
		 this.registerCerrar();
	 },

	 registerCerrar() {
		 this.setState({registered: false})
	 },

   render: function() {
   	 let container;
   	 let modal;
		 let registerModal;

		 //Si el usuario está logueado muestran los productos
	   	if (this.state.logueado && this.state.myProducts && !this.state.allProducts && !this.state.nearbyProducts && !this.state.wishlist) {
  			container = (
  				<div style={{paddingLeft:100, paddingRight:100}}>
            <h2>Mis Productos</h2>
  				  <MyProducts limit="5" mensaje = {this.setMensaje} data = {this.state.data} setData = {this.setData}/>
  				</div>
  			);
      //Si no está logueado muestra el formulario de login
		} else if(this.state.logueado && this.state.allProducts && !this.state.myProducts && !this.state.nearbyProducts && !this.state.wishlist) {
				container = (
					<div style={{paddingLeft:100, paddingRight:100}}>
						<div>
							<div className="col-md-10">
								<FormGroup>
									 <FormControl type="text" placeholder="Escribe aquí aquello que buscas..."/>
								</FormGroup>
							</div>
							<div className="col-md-2" style={{textAlign: 'center'}}>
								<Button type="submit" style={{paddingLeft:100, paddingRight:100}}>Buscar</Button>
							</div>
						</div>
						<br/>

						<div className="col-md-12">
							<h2>Productos</h2>
							<Products limit="5" mensaje = {this.setMensaje} data = {this.state.data} setData = {this.setData} count = {this.state.count}/>
						</div>
					</div>
				);
			} else if(this.state.logueado && this.state.nearbyProducts && !this.state.allProducts && !this.state.myProducts && !this.state.wishlist) {
					container = (
						<div style={{paddingLeft:100, paddingRight:100}}>
							<div>
								<div className="col-md-10">
									<FormGroup>
										 <FormControl type="text" placeholder="Escribe aquí aquello que buscas..."/>
									</FormGroup>
								</div>
								<div className="col-md-2" style={{textAlign: 'center'}}>
									<Button type="submit" style={{paddingLeft:100, paddingRight:100}}>Buscar</Button>
								</div>
							</div>
							<br/>

							<div className="col-md-12">
								<h2>Productos cercanos a tu zona</h2>
								<NearbyProducts limit="20" mensaje = {this.setMensaje} data = {this.state.data} setData = {this.setData} count = {this.state.count}/>
							</div>
						</div>
					);
			} else if (this.state.logueado && this.state.wishlist && !this.state.nearbyProducts && !this.state.allProducts && !this.state.myProducts) {
					container = (
						<div style={{paddingLeft:100, paddingRight:100}}>
							<h2>Mi lista de deseos</h2>
							<MyWishlist limit="20" mensaje = {this.setMensaje} data = {this.state.datafavourite} setData = {this.setFavouriteData} count = {this.state.count}/>
						</div>
					);
			} else {
	   		container = (
					<Grid>
					<Row className="show-grid">
						<Col md={4} mdPush={6} style={{paddingTop: 150}}>
							<Login login = {this.login} mensaje = {this.setMensaje} abrir = {this.registerUser}></Login>
						</Col>
						<Col md={6} mdPull={6} style={{paddingTop: 150, paddingLeft: 200}}>
							<img src="/web/public/images/logoyfrase.png" height="305" width="553" alt="thingyHome" />
						</Col>
					</Row>
					</Grid>
	   		);
	   	}

			//Si se pulsa el botón de registro
			if (this.state.registered) {
				registerModal = (
					<Register login = {this.login} email= '' name= '' password= '' gender={null} birthdate='' terms= {false} mensaje = {this.setMensaje} creado = {this.createUserSuccess} cerrar = {this.registerCerrar} />
				);
			}
      // Si hay un mensaje pendiente muestra un modal con el mensaje
	   	if (this.state.mensaje != '') {
	   		modal = (
					<Modal mensaje = {this.state.mensaje} mensajeLeido = {this.mensajeLeido} />
				);
	   	}

		 return <div>
	            <NavBar logueado = {this.state.logueado} OnAllProducts = {this.OnAllProducts} OnMyProducts = {this.OnMyProducts} OnNearbyProducts = {this.OnNearbyProducts} OnWishlist = {this.OnWishlist} logout = {this.logout}></NavBar>
			  			{container}
			  			{modal}
							{registerModal}
         		</div>
   }
})
module.exports = App

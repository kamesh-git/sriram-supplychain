import React, { useContext, useRef, useState } from 'react'
import Ethprovider from '../Context/provider'

const HomeScreen = () => {
    const { items, handlePayment, handleCreate, handleDeliver, loaded } = useContext(Ethprovider);
    const [admin, setAdmin] = useState(false);
    const [adminlogin, setAdminlogin] = useState(false);

    const [productname, setProductName] = useState("");
    const [productprice, setProductPrice] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault();
        setAdminlogin(!adminlogin);
        setAdmin(!admin);
    }
    if (!loaded) {
        return (
            <div id="spinner" class="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
                <div class="spinner-grow text-primary" role="status"></div>
            </div>
        )
    }
    return (
        <>

            {/* <!-- Navbar start --> */}
            <div className="container-fluid fixed-top">
                <div className="container topbar bg-primary d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="#" className="text-white">123 Street, New York</a></small>
                            <small className="me-3"><i className="fas fa-envelope me-2 text-secondary"></i><a href="#" className="text-white">Email@Example.com</a></small>
                        </div>
                        <div className="top-link pe-2">
                            <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                            <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                            <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
                        </div>
                    </div>
                </div>
                <div className="container px-0">
                    <nav className="navbar navbar-light bg-white navbar-expand-xl">
                        <a href="#" className="navbar-brand"><h1 className="text-primary display-6">Blockchain</h1></a>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary"></span>
                        </button>
                        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                            <div className="d-flex m-3 ms-auto me-0">
                                <a href="#" className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag fa-2x"></i>
                                    <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: "-5px", left: "15px", height: "20px", minWidth: "20px" }}>0</span>
                                </a>
                                <a onClick={() => setAdminlogin(true)} data-bs-toggle="modal" data-bs-target="#exampleModal" className="my-auto">
                                    <i className="fas fa-sign-in-alt fa-2x"></i>
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/* <!-- Navbar End --> */}

            {
                adminlogin ? <>
                    <div className="container-fluid py-5 mb-5 hero-header">
                        <div className="container py-5">
                            <div className="row g-5 align-items-center"></div>
                            <div className="modal-content">
                                <form className='form' onSubmit={handlesubmit}>

                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Supplier Login</h5>
                                        <button onClick={() => setAdminlogin(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="position-relative mx-auto">
                                            <input className="form-control border-2 my-2 border-secondary w-75 py-3 px-4 rounded-pill" type="email" placeholder="Email" required />
                                            <input className="form-control border-2 my-2 border-secondary w-75 py-3 px-4 rounded-pill" type="password" placeholder="Password" required />

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn my-2 btn-primary border-2 border-secondary py-3 px-4 rounded-pill text-white h-100" >Login</button>
                                    </div>
                                </form>

                            </div></div></div>

                </> :
                    <>



                        {/* <!-- Hero Start --> */}
                        <div className="container-fluid py-5 mb-5 hero-header">
                            <div className="container py-5">
                                <div className="row g-5 align-items-center">
                                    <div className="col-md-12 col-lg-7">
                                        <h4 className="mb-3 text-secondary">Supplychain Management in</h4>
                                        <h1 className="mb-5 display-3 text-primary">Blockchain</h1>
                                        {admin && <div className="position-relative mx-auto">
                                            <form onSubmit={e => { e.preventDefault(); handleCreate(productname, productprice) }}>
                                                <input value={productname} onChange={(e) => setProductName(e.target.value)} className="form-control border-2 my-2 border-secondary w-75 py-3 px-4 rounded-pill" type="text" placeholder="Product Name" required />
                                                <input value={productprice} onChange={(e) => setProductPrice(e.target.value)} className="form-control border-2 my-2 border-secondary w-75 py-3 px-4 rounded-pill" type="number" placeholder="Product Price" required />
                                                <button type="submit" className="btn my-2 btn-primary border-2 border-secondary py-3 px-4 rounded-pill text-white h-100" >Create Product</button>
                                            </form>
                                        </div>}
                                    </div>

                                    <div className="col-md-12 col-lg-5">
                                        <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                            <div className="carousel-inner" role="listbox">
                                                <div className="carousel-item active rounded">
                                                    <img src="img/hero-img-1.png" className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
                                                    <a href="#" className="btn px-4 py-2 text-white rounded">Blockchain</a>
                                                </div>
                                                <div className="carousel-item rounded">
                                                    <img src="img/hero-img-2.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                                    <a href="#" className="btn px-4 py-2 text-white rounded">Decentralization</a>
                                                </div>
                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Hero End --> */}


                        {/* <!-- Featurs Section Start --> */}
                        <div className="container-fluid featurs py-5">
                            <div className="container py-5">
                                <div className="row g-4">
                                    <div className="col-md-6 col-lg-3">
                                        <div className="featurs-item text-center rounded bg-light p-4">
                                            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                                <i style={{ rotate: "90deg" }} className="fab fa-hive fa-3x text-white"></i>
                                            </div>
                                            <div className="featurs-content text-center">
                                                <h5>Blockchain</h5>
                                                <p style={{ lineHeight: "inherit", textAlign: "justify" }} className="mb-0">Blockchain is a distributed ledger technology that allows data to be stored and verified across a network of computers, rather than relying on a single centralized authority. It consists of a series of blocks, each containing a list of transactions, linked together in a chronological and immutable chain.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                        <div className="featurs-item text-center rounded bg-light p-4">
                                            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                                <i className="fas fa-user-shield fa-3x text-white"></i>
                                            </div>
                                            <div className="featurs-content text-center">
                                                <h5>Security Payment</h5>
                                                <p style={{ lineHeight: "inherit", textAlign: "justify" }} className="mb-0">Security in blockchain refers to the protection of the network, data, and participants from various threats and vulnerabilities. While blockchain offers several security features, it's not immune to risks, and understanding these risks is crucial for implementing robust security measures.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                        <div className="featurs-item text-center rounded bg-light p-4">
                                            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                                <i className="fas fa-globe fa-3x text-white"></i>
                                            </div>
                                            <div className="featurs-content text-center">
                                                <h5>Decentralization</h5>
                                                <p style={{ lineHeight: "inherit", textAlign: "justify" }} className="mb-0">Decentralization is a fundamental concept in blockchain technology. It means that the control of the network is distributed among its participants rather than being concentrated in a single entity like a central authority or server. This distribution of control enhances security, transparency, and resilience of the network, as there's no single point of failure.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                        <div className="featurs-item text-center rounded bg-light p-4">
                                            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                                <i className="fa fa-file-contract fa-3x text-white"></i>
                                            </div>
                                            <div className="featurs-content text-center">
                                                <h5>Smart Contracts</h5>
                                                <p style={{ lineHeight: "inherit", textAlign: "justify" }} className="mb-0">Smart contracts are self-executing contracts with the terms of the agreement directly written into code. These contracts automatically enforce and execute the terms when predefined conditions are met. Smart contracts run on blockchain networks, enabling trustless and decentralized execution of agreements.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Featurs Section End --> */}


                        {/* <!-- Fruits Shop Start--> */}
                        <div className="container-fluid fruite py-5">
                            <div className="container py-5">
                                <div className="tab-class text-center">
                                    <div className="row g-4">
                                        <div className="col-lg-4 text-start">
                                            <h1>Our Products</h1>
                                        </div>
                                        <div className="col-lg-8 text-end">
                                        </div>
                                    </div>
                                    <div className="tab-content">
                                        <div id="tab-1" className="tab-pane fade show p-0 active">
                                            <div className="row g-4">
                                                <div className="col-lg-12">
                                                    <div className="row g-4">
                                                        {items.map((element, index) => {
                                                            if (element._step != 2)
                                                                return (
                                                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                                                        <div className="rounded position-relative fruite-item">
                                                                            <div className="fruite-img">
                                                                                <img src="img/blockchain-item.png" className="img-fluid w-100 rounded-top" alt="" />
                                                                            </div>
                                                                            <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>Item {index + 1}</div>
                                                                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                                                <h4>{element._identifier}</h4>
                                                                                <p style={{ textAlign: 'justify', wordWrap: "break-word", lineHeight: "inherit" }}> Address:{element._item}</p>
                                                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                                                    <p className="text-dark fs-5 fw-bold mb-0 mt-0">Wei:{element._priceInWei}</p>
                                                                                    <a onClick={() => { handlePayment(element._item, element._priceInWei) }} className={`btn border border-secondary rounded-pill px-3 text-primary ${element._step == 0 ? "" : "disabled"}`}><i className="fa fa-comment-dollar me-2 text-primary"></i> {element._step == 0 ? "Pay" : "Sold"}</a>
                                                                                    {element._step == 1 && <a onClick={() => { handleDeliver(index) }} className={`btn border border-secondary rounded-pill px-3 text-primary`}><i className="fa fa-truck me-2 text-primary"></i> deliver</a>}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )

                                                        })}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Fruits Shop End--> */}


                        {/* <!-- Footer Start --> */}
                        <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
                            <div className="container py-5">
                                <div className="pb-4 mb-4" style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}>
                                    <div className="row g-4">
                                        <div className="col-lg-3">
                                            <a href="#">
                                                <h1 className="text-primary mb-0">Blockchain</h1>
                                                <p className="text-secondary mb-0">Get products</p>
                                            </a>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="position-relative mx-auto">
                                                <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="number" placeholder="Your Email" />
                                                <button type="submit" className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white" style={{ top: "0", right: "0" }}>Subscribe Now</button>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="d-flex justify-content-end pt-3">
                                                <a className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-twitter"></i></a>
                                                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-facebook-f"></i></a>
                                                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-youtube"></i></a>
                                                <a className="btn btn-outline-secondary btn-md-square rounded-circle" href=""><i className="fab fa-linkedin-in"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-5">
                                    <div className="col-lg-3 col-md-6">
                                        <div className="footer-item">
                                            <h4 className="text-light mb-3">Why People Like us!</h4>
                                            <p className="mb-4">typesetting, remaining essentially unchanged. It was
                                                popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
                                            <a href="" className="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More</a>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="d-flex flex-column text-start footer-item">
                                            <h4 className="text-light mb-3">Shop Info</h4>
                                            <a className="btn-link" href="">About Us</a>
                                            <a className="btn-link" href="">Contact Us</a>
                                            <a className="btn-link" href="">Privacy Policy</a>
                                            <a className="btn-link" href="">Terms & Condition</a>
                                            <a className="btn-link" href="">Return Policy</a>
                                            <a className="btn-link" href="">FAQs & Help</a>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="d-flex flex-column text-start footer-item">
                                            <h4 className="text-light mb-3">Account</h4>
                                            <a className="btn-link" href="">My Account</a>
                                            <a className="btn-link" href="">Shop details</a>
                                            <a className="btn-link" href="">Shopping Cart</a>
                                            <a className="btn-link" href="">Wishlist</a>
                                            <a className="btn-link" href="">Order History</a>
                                            <a className="btn-link" href="">International Orders</a>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="footer-item">
                                            <h4 className="text-light mb-3">Contact</h4>
                                            <p>Address: 1429 Netus Rd, NY 48247</p>
                                            <p>Email: Example@gmail.com</p>
                                            <p>Phone: +0123 4567 8910</p>
                                            <p>Payment Accepted</p>
                                            <img src="img/payment.png" className="img-fluid" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Footer End --> */}

                        {/* <!-- Copyright Start --> */}
                        <div className="container-fluid copyright bg-dark py-4">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                        <span className="text-light"><a href="#"><i className="fas fa-copyright text-light me-2"></i>Your Site Name</a>, All right reserved.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Copyright End --> */}



                        {/* <!-- Back to Top --> */}
                        <a href="#" className="btn btn-primary border-3 border-primary rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>


                    </>
            }

        </>
    );
}

export default HomeScreen
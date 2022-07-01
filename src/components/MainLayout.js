import { Component } from "react";
import Summary from "./Summary";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

class MainLayout extends Component {
    render() {
        let titleBackButton = "Back to cart"
        let indexUrl = 1;
        if (window.location.pathname.includes("payment")) {
            titleBackButton = "Back to delivery";
            indexUrl = 2;
        } else if (window.location.pathname.includes("finish")) {
            titleBackButton = null
            indexUrl = 3;
        }

        const Container = styled.div`
            background-color: rgb(255, 250, 230);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        `

        const Content = styled.div`
            background-color: white;
            border-radius: 8px;
            display: flex;
            padding: 20px;
            /* max-width: 80%; */
            min-height: 60vh;
            margin: auto;
        `

        const Step = styled.div`
            background-color: rgb(255, 250, 230);
            color: #FF8A00;
            font-weight: 700;
            font-size: 16px;
            display: flex;
            margin: auto;
            text-align: center;
            border-radius: 9999px;
            height: 70px;
            left: 0;
            right: 0;
            top: -30px;
            align-content: center;
        `
        return (
            <>
                <Container>
                    <div className="w-11/12 md:relative">
                        <Step className="w-full md:w-4/12 md:absolute">
                            {["Delivery", "Payment", "Finish"].map((e, index) => (
                                <>
                                    <div className="flex my-auto w-full justify-center items-center">
                                        <div
                                            className={`${index < indexUrl ? 'active-step' : 'default-step'} w-8 h-8 rounded-full mr-2 inline-flex items-center`}
                                        >
                                            <div className="w-full">{index + 1}</div>
                                        </div>
                                        <div>{e}</div>
                                    </div>
                                    {index !== 2 && <FontAwesomeIcon icon={faChevronRight} className="my-auto"></FontAwesomeIcon>}
                                </>
                            ))}
                        </Step>
                        <Content className="flex-wrap">
                            <Link to={`/`} className="w-full h-fit mt-2 mb-5 font-semibold color-gray">
                                {titleBackButton != null && <FontAwesomeIcon className="mx-2" icon={faArrowLeft}></FontAwesomeIcon>}
                                {titleBackButton}
                            </Link>
                            <div className="flex-wrap md:flex min-h-full w-full">

                                <div className="w-full md:w-9/12">
                                    {this.props.children}
                                </div>
                                <div
                                    style={{ borderColor: "#ffe8cc" }}
                                    className="w-full md:w-3/12 border-t-2 md:border-l-2 md:border-t-0 px-2 md:pl-4 mt-4 md:mt-0 pt-4 md:pt-0"
                                >
                                    <Summary></Summary>
                                </div>
                            </div>
                        </Content>
                    </div>
                </Container>
            </>
        );
    }
}

export default MainLayout;

import React, { Component } from 'react'
import Anime from "react-anime";

class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shouldAnimate: false,
        }
        this.triggerAnim = this.triggerAnim.bind(this)
    }

    triggerAnim() {
        this.setState({
            shouldAnimate: !this.state.shouldAnimate
        })
    }


    render() {
        return (
            <div>

                {this.state.shouldAnimate === false ?
                    <button className='cta' onClick={() => this.triggerAnim()}> Click Me </button>
                    :
                    <Anime
                    translateY={-500}
                    >
                    <button className='cta' onClick={() => this.triggerAnim()}> Click Me </button>
                    </Anime>
                }

                <svg viewBox="0 0 215 105.5">
                    {this.state.shouldAnimate === true ?
                    <Anime
                        points={[
                            { value: '215,105.5 0,105.5 0,0 46.216,0 70.899,69.189' },
                            { value: '215,105.5 0,105.5 0,0 0,0 70.899,69.189 ' }
                        ]}
                        easing='easeOutQuad'
                        duration={1200}
                        loop={false}
                    >
                        <polygon fill="#27AAE1" points="215,105.5 0,105.5 0,0 47.7,0 215,0 " />
                    </Anime>
                    :
                    <polygon fill="#27AAE1" points="215,105.5 0,105.5 0,0 46.216,0 215,0 " />
                    }
                </svg>

                {this.state.shouldAnimate === true ?
                    <Anime
                    opacity={1}
                    duration={500}
                    translateY={150}
                    >
                    <div className='blip'>
                        <h1> Wow! What a Reveal! </h1>
                        <p> How will you REACT to this wonderful use of SVG MORPHING using Anime.JS-REACT???! </p>
                        <button className='cta2' onClick={() => this.triggerAnim()} > Go Back </button>
                    </div>
                    </Anime>
                    
                    :

                    <div className='blip'>
                    <h1> Wow! What a Reveal! </h1>
                    <p> How will you REACT to this wonderful use of SVG MORPHING using Anime.JS-REACT???! </p>
                    <button className='cta2' onClick={() => this.triggerAnim()}> Go Back </button>
                    </div>
                }
            </div>
        );
    }
}

export default MainPage;
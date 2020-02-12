import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'candidate-display',
    styleUrl: 'candidates-display.css'
})

export class CandidatesDisplay {

    @Prop() data;
    
    render() {

        const cards = !this.data? null : this.data.map(candidate =>{ 
             return <profile-card 
                        name={candidate.Post}
                        position={candidate.Post}
                        link={candidate.Manifestolink}
                        image='https://www.kclsu.org/asset/Manifesto/6795/Manifesto-pic.png'
                    />
        })

        return (
            <div class="card-layout">
                {cards}
            </div>

        );
    }

}

// interface ReceivedData {
//     Display: string ,
//     Image: string,
//     Manifesto: string,
//     Manifestolink: string,
//     Post: string
// }


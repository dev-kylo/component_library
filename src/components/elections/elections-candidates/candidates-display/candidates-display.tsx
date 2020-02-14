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
                        name={candidate.Name.toLowerCase()}
                        position={candidate.Post}
                        link={candidate.ManifestoLink}
                        image={candidate.ImageLink? candidate.ImageLink : 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg'} 
                        cta='My manifesto'
                        secondcta = 'Results'
                        secondlink = {candidate.ResultsLink}
                    />
        })

        return (
            <div class="card-layout">
                {cards}
            </div>

        );
    }

}

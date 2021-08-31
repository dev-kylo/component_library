import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'candidate-display',
    styleUrl: 'candidates-display.css',
    shadow: true
})

export class CandidatesDisplay {

    @Prop() data;
    
    render() {
        const cards = !this.data? null
         : 
         this.data
                .sort((a, b) => {
                    if (a.DisplayName){
                        let nameA = a.DisplayName.split(' ');
                        let nameB = b.DisplayName.split(' ');
                        if (nameA[1] < nameB[1]) {
                            return -1;
                            }
                        if (nameA[1]  > nameB[1] ) {
                        return 1;
                        }
                    }
                    
                })
                .map(candidate =>{ 
                    let name = candidate.Name || candidate.DisplayName;
                    let image = candidate.ImageLink || candidate.ImageUrl;
                    if (name.includes('R.O.N')) name = 'Re-Open Nominations';
                    return <profile-card 
                                name={name.toLowerCase()}
                                position={candidate.Post.Title || candidate.Post}
                                link={candidate.ManifestoLink || candidate.ManifestoUrl}
                                image={image} 
                                cta='Manifesto'
                                secondcta = 'Breakdown'
                                secondlink = {candidate.ResultsLink}
                            />
                })

        return (
            <profile-card-layout>
                {cards}
            </profile-card-layout>
        );
    }

}

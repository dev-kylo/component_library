import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'candidate-display',
    styleUrl: 'candidates-display.css',
    shadow: true
})

export class CandidatesDisplay {

    @Prop() data;
    /** Using legacy data */
    @Prop() legacy = false;
    /** URL for a page to hold breakdowns, as a fallback option*/
    @Prop() fallbackbreakdownurl;
    /** URL for a page to hold breakdowns, as a fallback option*/
    @Prop() emitpostid: boolean = false;
    /** URL for a page to hold breakdowns, as a fallback option*/
    @Prop() electionid: string | number;



    render() {

        console.log('RECEIVED')
        console.log(this.data)

        const cards = !this.data ? null
            :
            this.data
                .sort((a, b) => {
                    if (a.DisplayName) {
                        let nameA = a.DisplayName.split(' ');
                        let nameB = b.DisplayName.split(' ');
                        if (nameA[1] < nameB[1]) {
                            return -1;
                        }
                        if (nameA[1] > nameB[1]) {
                            return 1;
                        }
                    }

                })
                .map((candidate) => {
                    let name = candidate.Name || candidate.DisplayName;
                    let image = candidate.ImageLink || candidate.ImageUrl;
                    if (name.includes('R.O.N')) name = 'Re-Open Nominations';
                    return <profile-card
                        name={name.toLowerCase()}
                        position={candidate.Post.Title || candidate.Post}
                        link={candidate.ManifestoLink || candidate.ManifestoUrl}
                        image={image}
                        cta='Manifesto'
                        secondcta={this.emitpostid ? 'Breakdown' : ''}
                        secondlink={this.fallbackbreakdownurl ? this.fallbackbreakdownurl : undefined}
                        emitid={this.emitpostid && !this.legacy && JSON.stringify({ post: candidate.Post.Id, election: this.electionid })}
                    />
                })

        return (
            <profile-card-layout>
                {cards}
            </profile-card-layout>
        );
    }

}

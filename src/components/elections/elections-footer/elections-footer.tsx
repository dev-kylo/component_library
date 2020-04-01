import { Component, h } from '@stencil/core';

@Component({
  tag: 'elections-footer',
  styleUrls: ['elections-footer.scss', 'styles.css'],
  shadow: true
})

export class ElectionsFooter {

  render() {
    return (
	<div class="yellow" id="strip">
		<div class="white" id="logo">
            <div class="mslwidget msl-pagebanner">
                <img src="https://www.kclsu.org/pageassets/elections/elections-thumbnail-final.png" />
            </div>
        </div>
		<div class="container">
		<div class="row">
			<div class="col col-xs-12 col-md-4">
				<h3>Contact Us</h3>
				<p>Please provide your K number, full name and KCL email address.</p>
				<purple-button whitetext link="mailto:elections@kclsu.org"> elections@kclsu.org </purple-button>
				
			</div>
	
			<div class="col col-xs-12 col-md-4">
				<h3>Have a question?</h3>
				<p> We can help you with any of the following:</p>
				<ul>
					<li class="arrowBefore">Problems logging in</li>
					<li class="arrowBefore">Problems voting</li>
					<li class="arrowBefore">Elections process</li>
					<li class="arrowBefore">Help and guidance</li>
				</ul>
			</div>
	
			<div class="col col-xs-12 col-md-4">
				<h3>Complaints</h3>
				<p>If you'd like to make a complaint, please click through to the&nbsp;<strong><a style={{"color": "white"}} class="link" href="/change/elections/complaints/">Elections Complaints page.</a></strong></p>
				<purple-button whitetext link="/elections"> Elections Home Page </purple-button>
		    </div>
		</div>
		</div>
    </div>

    );  
  }
}

import * as React from 'react';
import { AvTransform } from './aardvark_transform';
import bind from 'bind-decorator';
import { AvModel } from './aardvark_model';
import { HighlightType, AvGrabbable, GrabResponse } from './aardvark_grabbable';
import { AvSphereHandle, AvModelBoxHandle } from './aardvark_handles';
import { AvGrabEvent } from './aardvark_protocol';


interface GrabButtonProps
{
	onTrigger: () => void;
	modelUri?: string;
	radius?: number;
}

interface GrabButtonState
{
	highlight: HighlightType;
}

export class AvGrabButton extends React.Component< GrabButtonProps, GrabButtonState >
{
	constructor( props: any )
	{
		super( props );

		this.state = 
		{ 
			highlight: HighlightType.None,
		};
	}

	@bind updateHighlight( newHighlight: HighlightType )
	{
		this.setState( { highlight: newHighlight } );
	}

	@bind onGrabRequest( event: AvGrabEvent )
	{
		return new Promise<GrabResponse>( ( resolve, reject ) =>
		{
			let resp: GrabResponse =
			{
				allowed: false,
			}
			resolve( resp );

			this.props.onTrigger();
		} );
	}
	
	public render()
	{
		return <div>
				<AvGrabbable updateHighlight={ this.updateHighlight } onGrabRequest={ this.onGrabRequest }>
					{ this.props.radius 
						&& <AvSphereHandle radius={ this.props.radius ? this.props.radius : 0.1 } /> }
					{ !this.props.radius && this.props.modelUri
						&& <AvModelBoxHandle uri={ this.props.modelUri } /> }
				</AvGrabbable>
				<AvTransform uniformScale={ this.state.highlight == HighlightType.InRange ? 1.1 : 1.0 } >
					{ this.props.modelUri && <AvModel uri={ this.props.modelUri } /> }
					{ this.props.children }
				</AvTransform>
			</div>;
	}
}


import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewContainer from './pc_newscontainer';

export default class PCIndex extends React.Component {
    render() {
        return (
            <div>
                <PCHeader />
                <PCNewContainer />
                <PCFooter />
            </div>
        )
    }
}
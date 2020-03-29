import React, { Component } from 'react';
import { ucFirst } from '../constants';

export default class TableHeader extends Component {
    render() {
        return (
            <thead>
                <tr>
                    <th scope="col">{ucFirst(this.props.groupBy)}</th>
                    <th scope="col">Impressions</th>
                    <th scope="col">Conversions</th>
                    <th scope="col">Money</th>
                </tr>
            </thead>
        )
    }
}

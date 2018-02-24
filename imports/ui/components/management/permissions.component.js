import React, { PureComponent } from "react";
import { withTracker } from 'meteor/react-meteor-data';

import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';
import CheckBox from 'grommet/components/CheckBox';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';

import { permissions } from "../../../api/permissions";

export class Permissions extends PureComponent {

    newGroup = (name) => {

    }

    render() {
        return (
            <Box direction="row" wrap={true} className="mc-per" justify="center" align="center">
                <Header>
                    <Heading>
                        新增用户
                    </Heading>
                </Header>
                {
                    this.props.loading || (
                        this.props.permissions.filter(val => (val.id !== 0)).map(val => {
                            return (
                                <FormField label={val.name} key={val._id} className="per-group">
                                    {
                                        val.permissions.map(val => {
                                            return (<CheckBox label={val.name} defaultChecked={val.allow} key={val.name} />)
                                        })
                                    }
                                    <Box direction="row" justify="around" separator="top" pad="small">
                                        <Anchor >查看组员</Anchor>
                                        <Anchor >提交修改</Anchor>
                                    </Box>
                                </FormField>
                            )
                        })
                    )
                }
            </Box>
        )
    }
}

export default withTracker(() => {
    let handle = Meteor.subscribe('permissions');

    return {
        loading: !handle.ready(),
        permissions: permissions.find().fetch()
    }
})(Permissions)
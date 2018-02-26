import React, { PureComponent } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Anchor from "grommet/components/Anchor";
import CloudUpload from "grommet/components/icons/base/CloudUpload";
import Spinning from 'grommet/components/icons/Spinning';

import Dropzone from 'react-dropzone';

import { resourses, courses } from "../../../api/course";


export class Resource extends PureComponent {

    state = {
        uploading: false
    }

    onDrop = (acceptedFiles) => {
        acceptedFiles.forEach(file => {
            resourses.insert({
                file: file,
                onStart: () => {
                    this.setState({
                        uploading: true
                    })
                },
                onUploaded: (error, fileObj) => {
                    if (error) {
                        alert('Error during upload: ' + error);
                    } else {
                        this.props.onUp && this.props.onUp(fileObj._id);
                    }
                    this.setState({
                        uploading: false
                    })
                },
                streams: 'dynamic',
                chunkSize: 'dynamic'
            })
        });
    }

    render() {
        return (
            <Box className="resource">

                <Box size={{ height: { min: 'small' } }} pad="small">
                    <List>
                        {
                            this.props.loading ? (
                                <Box align="center" justify="center" direction="row">正在资源 <Spinning /></Box>
                            ) : (
                                    this.props.resourses.map(val => {
                                        let file = resourses.findOne({ _id: val._id })
                                        return (
                                            <ListItem justify='between' key={val._id}
                                                separator='horizontal'>
                                                <span>
                                                    {val.name}
                                                </span>
                                                <span className='secondary'>
                                                    <Anchor href={file.link()}>下载</Anchor>
                                                    <span> </span>
                                                    {
                                                        this.props.permissions && this.props.permissions.editCourse &&
                                                        (<Anchor onClick={(e) => {
                                                            e.preventDefault();
                                                            file.remove();
                                                            this.props.onRemove && this.props.onRemove(val._id);
                                                        }}>删除</Anchor>)
                                                    }
                                                </span>
                                            </ListItem>
                                        )
                                    })
                                )
                        }
                    </List>
                    {
                        this.props.resourses && this.props.resourses.map(val => val).length === 0 &&
                       ( <Box align="center" justify="center"><span>暂无资源！</span></Box>)
                    }
                </Box>

                {
                    this.props.permissions && this.props.permissions.editCourse && (
                        <Dropzone className="dropzone" disablePreview={true} onDrop={this.onDrop} disabled={this.state.uploading}  >
                            <CloudUpload size="large" colorIndex="brand" />
                            {
                                this.state.uploading ? (
                                    <div>正在上传... <Spinning /></div>
                                ) : (
                                        <p>点击或拖动上传</p>
                                    )
                            }

                        </Dropzone>
                    )
                }
            </Box>
        )
    }
}

export default withTracker((props) => {
    let _resourse = courses.findOne({ _id: props.courseid }).resourses || [];
    let handle = Meteor.subscribe('course.resourses', _resourse);

    return {
        permissions: Session.get('permissions'),
        resourses: resourses.find({ _id: { $in: _resourse } }),
        loading: !handle.ready(),
    }
})(Resource);
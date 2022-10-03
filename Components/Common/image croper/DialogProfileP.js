import React, { PureComponent, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { withStyles } from "@material-ui/styles";
import { Box, Grid, Avatar, Container, Modal } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Fade from '@material-ui/core/Fade';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// mrx : api links
import {
    BASE_Image_Url,
} from '../../../pages/api/index';

// mrx : context
import { Contexts } from '../../../contexts';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    dialogPaper: {
        minHeight: "80vh",
        maxHeight: "80vh"
    },
    paragraphPost: {
        color: '#353333e6',
        lineHeight: '2rem',
        fontSize: '1.3rem',
        width: "100%",
        overflow: "hidden",
        background: "#fafafa",
        border: "none",
    },
    selectBoxTextFeildCheck: {
        '& select': {
            border: 'none',
            outline: 'none',
            borderRadius: '.5rem',
            backgroundColor: '#d1d3d487',
            width: '49%',
            fontWeight: '700',
            padding: '.75rem',
            boxShadow: '0px 14px 16px 0px rgba(188, 190, 192, 0.004)',
        }
    },
    Input: {
        width: "100%",
        border: ' none',
        background: '#e6e6e6d6',
        height: ' 42px',
        marginBottom: ' 15px',
        borderRadius: ' 20px',
        padding: ' 20px',
        outline: ' none',
        color: '#2f2e2e',
    },
    avatorImageBox: {
        marginTop: '-4rem',
        '& .MuiAvatar-root': {
            border: '3px solid #fff',
        },
        '& svg': {
            fontSize: '2rem',
            marginBottom: '2rem'
        },
    },
    avatorImage: {
        boxShadow: '0px -2px 13px 2px rgba(188,190,192,0.64)',
    },
    titleOfProfile: {
        fontSize: '1.4rem',
    },
    titleOfProfilePost: {
        float: "right",
        marginRight: "100px",
        fontSize: '1.5rem',
    },
    biographytitle: {
        background: "#fafafa",
        height: "116px",
        border: "none",
        overflow: "hidden",
        margin: "10px 20px 0px",
    },
    alertBoxItem: {
        borderRadius: '1rem',
        '& svg': {
            color: '#ffffffb8'
        },
        '& span': {
            fontSize: '1.2rem',
            color: '#ffffffb8',
            fontWeight: 'bold'

        }
    },
};

class AlertDialogSlide extends PureComponent {

    state = {
        open: false,
        src: null,
        crop: {
            unit: "pixel",
            width: 10000000,
            aspect: 200 / 200
        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
            this.props.setButtonType(false);
            this.props.setPicture(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                "newFile.jpeg"
            );
            this.setState({ croppedImageUrl });
            this.props.setImage(croppedImageUrl);
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        this.props.setPicDtP({
            x: parseInt(crop.x * scaleX),
            y: parseInt(crop.y * scaleY),
            w: parseInt(crop.width * scaleX),
            h: parseInt(crop.height * scaleY)
        })
        console.log("sdfsdf " + JSON.stringify({
            x: parseInt(crop.x * scaleX),
            y: parseInt(crop.y * scaleY),
            w: parseInt(crop.width * scaleX),
            h: parseInt(crop.height * scaleY)
        }))
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, "image/jpeg");
        });
    }

    render() {
        let fileInput = React.createRef();
        const { crop, croppedImageUrl, src } = this.state;
        return (
            <div>

                {
                    this.props.type !== "edit" ?
                        <>
                            <label htmlFor="icon-button-Profile">
                                {this.props.ButtonType ? (
                                    <>
                                        <Avatar onClick={this.handleClickOpen} alt="Cindy Baker" src={this.props.Image} />
                                        <span onClick={this.handleClickOpen} className="AddProfileIcon">+</span>                                    </>
                                ) : (
                                    " "
                                )}
                            </label>
                            <label htmlFor="icon-button-Profile">
                                {!this.props.ButtonType ? (
                                    <>
                                        <Avatar onClick={this.handleClickOpen} alt="Cindy Baker" src={this.props.Image} />
                                        <span onClick={this.handleClickOpen} className="AddProfileIcon">+</span>                                    </>
                                ) : (
                                    " "
                                )}
                            </label>
                        </>
                        : <>
                            {/* <p>{this.props.ButtonType === true ? BASE_Image_Url + this.props.Image : this.props.Image}</p> */}
                            <Avatar alt="Cindy Baker" src={this.props.ButtonType === true ? BASE_Image_Url + this.props.Image : this.props.Image} className={styles.avatorImage} />
                            <span onClick={this.handleClickOpen} className="AddProfileIcon">+</span>
                        </>
                }


                <Modal
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                    style={{
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "scroll",
                        marginBottom: "50px"
                    }}
                >
                    <Fade in={this.state.open} mountOnEnter unmountOnExit>
                        <Grid
                            style={{
                                maxWidth: "50rem",
                                backgroundColor: "#fafafa",
                                width: "100%",
                                borderRadius: "20px",
                                padding: "20px",
                                margin: "0px 10px"
                            }}
                            container justify="center">
                            {/* <h2>{src === null ? "انتخاب" : "تغییر"} عکس آگهی</h2> */}
                            <Grid>
                                <input
                                    ref={fileInput}
                                    style={{ display: "none" }}
                                    multiple
                                    accept="image/*"
                                    type="file"
                                    onChange={(e) => this.onSelectFile(e)}
                                />

                                {src && (
                                    <ReactCrop
                                        src={src}
                                        crop={crop}
                                        onImageLoaded={this.onImageLoaded}
                                        onComplete={this.onCropComplete}
                                        onChange={this.onCropChange}
                                    />
                                )}
                                {/* {croppedImageUrl && (
                                    <img
                                        alt="Crop"
                                        style={{ maxWidth: "100%", borderRadius: "10px" }}
                                        src={croppedImageUrl}
                                    />
                                )} */}
                            </Grid>
                            <Box display='flex' width='100%' justifyContent='space-evenly'>
                                <Button
                                    onClick={() => fileInput.current.click()}
                                    style={{
                                        background: "#eaeaea",
                                        width: "100%",
                                        fontSize: "15px !important",
                                        color: "#585591",
                                        borderRadius: "20px",
                                        border: "solid 1px blue",
                                        margin: 10
                                    }}
                                >
                                    {src === null ? "انتخاب عکس" : "تغییر عکس"}
                                </Button>
                                <Button
                                    style={{
                                        background: "#eaeaea",
                                        width: "100%",
                                        fontSize: "15px !important",
                                        color: "#585591",
                                        borderRadius: "20px",
                                        border: "solid 1px #b7b2b2",
                                        margin: 10
                                    }}
                                    onClick={this.handleClose}
                                >
                                    انصراف
                                </Button>

                                {src !== null ? (
                                    <Button
                                        style={{
                                            background: "#eaeaea",
                                            width: "100%",
                                            fontSize: "15px !important",
                                            color: "#585591",
                                            borderRadius: "20px",
                                            border: "solid 1px #b7b2b2",
                                            margin: 10
                                        }}
                                        onClick={() => this.setState({ src: null, open: false })}
                                    >
                                        ذخیره عکس
                                    </Button>
                                ) : null}
                            </Box>
                        </Grid>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default AlertDialogSlide;

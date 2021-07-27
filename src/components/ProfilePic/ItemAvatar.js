import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Dialog, Slider, Button } from '@material-ui/core';
import UploadFileIcon from '../../common/svgImages/UploadFile';
import CloseIcon from '@material-ui/icons/Close';
import Cropper from 'react-easy-crop';
import { Label1 } from '../../common/Text';
import getCroppedImg from './utils';
import { COLORS } from '../../styles/appConsts';

const MOBILE_WIDTH = 345;
const DESKTOP_WIDTH = 832;

const useStyles = makeStyles((theme) => ({
    topItem: {
        // marginBottom: `${SIZES.m}px`,
        display: 'inline-block',
        width: DESKTOP_WIDTH,
        [theme.breakpoints.down('sm')]: {
            width: MOBILE_WIDTH,
        },
    },
    avatar: {
        marginTop: 'auto',
        height: '90px',
        width: '90px',
        '&>*': {
            shapeRendering: 'geometricPrecision',
        },
    },
    avatarMenu: {
        top: '15% !important',
        left: '50% !important',
        [theme.breakpoints.down('sm')]: {
            top: '12% !important',
            left: '25% !important',
        },
    },
    dialogBoxSize: {
        padding: 40,
        paddingBottom: 23,
        // width: 600,
        width: 400,
        [theme.breakpoints.down('sm')]: {
            width: 280,
        },
    },
    labelForfileUpload: {
        marginTop: 410,
        [theme.breakpoints.down('sm')]: {
            marginTop: 205,
        },
    },
    mdhiAvatar: {
        height: '50px',
        width: '50px',
    },
    badgeMdhiAvatarTopRight: {
        top: '20px',
        right: '9px',
    },
    editIcon: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        left: 43,
        zIndex: 10,
    },
    input: {
        display: 'none',
    },
    cropContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
        background: COLORS.GRAY_200,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            height: 400,
        },
    },
    cropButton: {
        flexShrink: 0,
        marginLeft: 16,
        width: '40%',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 5,
            alignItems: 'center',
        },
    },
    controls: {
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
    },
    sliderContainer: {
        width: '100%',
        display: 'flex',
        flex: '1',
        alignItems: 'center',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    sliderBox: {
        width: '45%',
        [theme.breakpoints.down('sm')]: {
            width: '85%',
        },
    },
    sliderBoxRight: {
        width: '48%',
        marginLeft: '4%',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            width: '85%',
        },
    },
    sliderLabel: {
        [theme.breakpoints.down('sm')]: {
            minWidth: 65,
        },
    },
    sliderLabelRight: {
        marginLeft: 10,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    slider: {
        padding: '22px 0px',
        marginLeft: 5,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            flexDirection: 'row',
            alignItems: 'center',
        },
    },
    sliderRight: {
        padding: '22px 0px',
        marginLeft: 16,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            flexDirection: 'row',
            alignItems: 'center',
        },
    },
    innerFileIcon: {
        position: 'absolute',
        alignItems: 'center',
        top: '40%',
        left: '50%',
        [theme.breakpoints.down('sm')]: {
            top: '26%',
        },
        transform: 'translate(-50%, -50%)',
    },
    outerFileIcon:{
        position: 'relative',
        alignItems: 'center',
        display: "flex",
        flexDirection: "row",
        cursor: 'pointer',
        width: "10%",
        left: '36%',
        minWidth: '210px',
        // marginTop: "15px",
        justifyContent: "center",
        textAlign: "center",
        alignContent:"center",  
        '@media screen and (min-width: 0px) and (max-width: 960px)': {
            left: '15%',
        }
    },
    uploadLabel1: {
        border: '1px solid #ccc',
        display: 'inline-block',
        padding: '6px 12px',
        width: '95%',
        height: 400,
        [theme.breakpoints.down('sm')]: {
            height: 200,
        },
        cursor: 'pointer',
        background: COLORS.GRAY_300,
    },
    uploadLabel2: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
    },
    uploadLabel: {
        // minWidth: '150px',
        justifyContent: "center",
        textAlign: "center",
        alignContent:"center" ,
        color: COLORS.WHITE
    },
    uploadIcon1: {
        width: '5em',
        height: '5em',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    uploadIcon2: {
        cursor: 'pointer',
    },
    uploadText2: {
        color: COLORS.VIBRANT_BLUE_2,
        fontSize: 14,
        cursor: 'pointer',
        paddingTop: 7,
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: COLORS.GRAY_500,
    },
    menutItemWrapper: {
        width: 140,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        color: "#fff !important",
        background: "#2979FF",
        fontWeight: 600,
        padding: "20px",
        borderRadius: "5px",
        display: "inline-block",
        border: "none",
        width: "10%",
        minWidth: '200px',
        // marginTop: "15px",
        "&:hover": {
            backgroundColor: "coral",
        },
    },
}));

function ItemAvatar({croppedImage, setCroppedImage}) {
    const classes = useStyles();
    const [uploadInputLabel, setUploadInputLabel] = React.useState('Upoload profile picture');
    const [openModal, setOpenModal] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    const [rotation, setRotation] = React.useState(0);
    const [zoom, setZoom] = React.useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const filesize = files[0] ? (files[0].size / 1024 / 1024).toFixed(4) : 0; // file size in MB

        const reader = new FileReader();
        reader.onload = () => {
            if (filesize <= 4) {
                setError(null);
                setImage(reader.result);
                setUploadInputLabel('Upload a new photo');
            } else {
                setError('The image you tried to upload is too large. Please try a smaller image.');
            }
        };
        if (files[0]) {
            reader.readAsDataURL(files[0]);
        }
    };

    const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onImageCropped = async () => {
        if (croppedAreaPixels) {
            try {
                const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
                const blobImage = await fetch(croppedImage).then((r) => r.blob());
                setCroppedImage(blobImage);
                setOpenModal(false);
            } catch (e) {
                console.error(e);
                setOpenModal(false);
            }
        }
    };

    return (
        <Grid id='avatar-grid' container item direction='column' alignItems='center' className={classes.topItem}>
            <div className={classes.outerFileIcon} onClick={() => setOpenModal(true)}>
                <UploadFileIcon color={COLORS.VIBRANT_BLUE_2} className={classes.uploadIcon1} />
                <Label1 className={classes.uploadLabel}> Upload an image </Label1>
            </div>
            <Dialog onClose={() => setOpenModal(false)} open={openModal}>
                <IconButton aria-label='close' className={classes.closeButton} onClick={() => setOpenModal(false)}>
                    <CloseIcon />
                </IconButton>
                <div className={classes.dialogBoxSize}>
                    <div style={{ width: '100%' }}>
                        {image ? (
                            <div className={classes.cropContainer}>
                                <Cropper
                                    image={image}
                                    crop={crop}
                                    rotation={rotation}
                                    zoom={zoom}
                                    aspect={3 / 3}
                                    cropShape='round'
                                    onCropChange={setCrop}
                                    onRotationChange={setRotation}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                                <label htmlFor='file-upload' className={classes.labelForfileUpload}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <UploadFileIcon color={COLORS.VIBRANT_BLUE_2} className={classes.uploadIcon2} />
                                        <Label1 className={classes.uploadText2}>{uploadInputLabel}</Label1>
                                    </div>
                                </label>
                                <input id='file-upload' type='file' onChange={onChange} className={classes.input} />
                            </div>
                        ) : (
                            <>
                                <label htmlFor='file-upload' className={classes.uploadLabel1}>
                                    <div className={classes.innerFileIcon}>
                                        <UploadFileIcon color={COLORS.VIBRANT_BLUE_2} className={classes.uploadIcon1} />
                                        <Label1 className={classes.uploadLabel2}>
                                            {uploadInputLabel}
                                        </Label1>
                                    </div>
                                </label>
                                <input id='file-upload' type='file' onChange={onChange} className={classes.input} />
                            </>
                        )}
                    </div>
                    <div className={classes.sliderContainer} style={image && { paddingTop: 40 }}>
                        <div className={classes.sliderBox}>
                            <Label1 className={classes.sliderLabel}> Zoom </Label1>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                disabled={!image}
                                aria-labelledby='Zoom'
                                className={classes.slider}
                                onChange={(e, zoom) => setZoom(zoom)}
                            />
                        </div>
                        <div className={classes.sliderBoxRight}>
                            <Label1 className={classes.sliderLabelRight}>Rotation</Label1>
                            <Slider
                                value={rotation}
                                min={0}
                                max={360}
                                step={1}
                                disabled={!image}
                                aria-labelledby='Rotation'
                                className={classes.sliderRight}
                                onChange={(e, rotation) => setRotation(rotation)}
                            />
                        </div>
                    </div>
                    <div className={classes.controls}>
                        <Button
                            onClick={() => onImageCropped()}
                            disabled={!image}
                            variant='contained'
                            color='primary'
                            className={classes.cropButton}
                        >
                            Crop Image
                        </Button>
                    </div>
                    {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
                </div>
            </Dialog>
        </Grid>
    );
}

export default ItemAvatar;

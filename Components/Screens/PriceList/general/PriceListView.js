import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { makeStyles } from '@material-ui/core/styles';
// material ui
import { Box, Grid, Container, Button } from '@material-ui/core';

// mrx : cookie
import Cookies from 'js-cookie';

import EditPrice from '../../modals/price/EditPrice';


// mrx : style
//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;
import { theme } from '../../../theme';



const useStyles = makeStyles({
    title: {
        color: '#000',
        padding: '10px',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '5px',
        fontSize: '14px',
    },
    itemTitle: {
        color: '#525252',
        width: '50%',
        paddingRight: '10px',
        fontSize: '13px',
    },
    itemValue: {
        color: '#525252',
        width: '50%',
        justifyContent: 'end',
        paddingLeft: '10px',
        fontSize: '13px',
    },
    itemBox: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});
import { BASE_Image_Url, EDIT_PRICE_LIST, GET_USER_PRICE_LIST } from '../../../../pages/api';
import { GetUrl, PostAuthUrl, PutAuthUrl } from '../../../../pages/api/config';
const PriceListView = ({ id, qrCodeImage }) => {
    const classes = useStyles();

    //for store the price list data
    const [priceList, setPriceList] = useState([]);
    //if the same user then show edit button else just show price list
    const [isUser, setIsUser] = useState(false);
    //for showing the edit modal
    const [showEditModal, setShowEditModal] = useState(false);

    const getPriceList = () => {
        GetUrl(GET_USER_PRICE_LIST(id)).then(res => {
            if (res && res.status === 200) {
                const data = res?.data?.data;
                console.log('data', data)
                setPriceList(data);
            } else {
                toast.error(res?.data?.message);
            }
        })
    }
    const editPriceList = (data) => {
        PostAuthUrl(EDIT_PRICE_LIST, data).then(res => {
            if (res && res.status === 200) {
                toast.success("با موفقیت ویرایش شد");
                getPriceList();
            } else {
                toast.error(res?.data?.message);
            }
        })
    }
    useEffect(() => {
        getPriceList();
        if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n"))
            if (Cookies.get("USID") === id)
                setIsUser(true);
    }, [id]);
    return (
        <>
            {
                priceList?.length > 0 ?

                    priceList?.map((price) => (
                        <>
                            <Box component='span' fontWeight='bold' display='flex' className={classes.title} mt={3} mb={2}>
                                {price?.title}
                            </Box>
                            {
                                price?.priceItem?.map((item, index) => (
                                    <>
                                        <div className={classes.itemBox} key={item?.id}>
                                            <Box component='span' fontWeight='bold' display='flex' className={classes.itemTitle} >
                                                {item?.itemTitle}
                                            </Box>
                                            <Box component='span' display='flex' className={classes.itemValue} >
                                                {item?.itemValue}
                                            </Box>
                                        </div>
                                        {
                                            index !== price?.priceItem?.length - 1 ?
                                                <Box mb={2} pb={2} style={{ textAlign: 'center', borderBottom: '2px solid #aaa' }}></Box>
                                                : <></>
                                        }
                                    </>
                                ))
                            }
                        </>

                    ))

                    :
                    <Box component='span' fontWeight='bold' justifyContent='center' fontSize='13px' display='flex' mt={3}>
                        لیست قیمتی وارد نشده است
                    </Box>
            }
            {
                isUser ?
                    <Box mt={5} width='100%' textAlign='center' className={classes.buttonSignUp} style={{ marginTop: '20px' }}>
                        <Box mb={2} mt={3} pb={2} style={{ textAlign: 'center', borderBottom: '2px solid #aaa' }}></Box>
                        <div style={{ display: 'flex', justifyContent: 'space-between',alignItems:'center' }}>
                            <div style={{textAlign:'center',width:'50%'}}>
                                <Button style={{ margin: "0px 10px", color: "#fff", backgroundColor: "rgb(239 75 76)", borderRadius: '10px' }} onClick={() => setShowEditModal(true)} variant="contained" width='30%'>ویرایش</Button>

                            </div>
                            {
                                qrCodeImage !== null && (
                                    <div style={{ width: '40%', textAlign: 'center' }}>
                                        <img src={BASE_Image_Url + qrCodeImage} style={{ width: '100%' }} />
                                        <Button style={{ margin: "0px 10px", color: "#fff", backgroundColor: "rgb(239 75 76)", borderRadius: '10px' }} onClick={()=>window.location.href=BASE_Image_Url + qrCodeImage}  variant="contained" width='30%'>
                                        دانلود
                                        </Button>

                                    </div>
                                )
                            }
                        </div>
                    </Box>
                    : <> </>
            }
            {showEditModal ?
                <EditPrice data={priceList} handleModal={setShowEditModal} handleEdit={editPriceList} />
                : <></>
            }
        </>
    )
}

export default PriceListView;
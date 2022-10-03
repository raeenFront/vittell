import { Fragment, useState, useEffect, useContext } from "react";

// mrx : material ui
import { Box, Container } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import LoadingCategorie from "../../Components/Common/Loading/CategorieLoading";

// mrx : api links
import { GET_ALL_CATEGORY, GET_ALL_CATEGORYS } from "../../pages/api/index";

// mrx : api
import { PostUrl, GetUrl, PostAuthUrl } from "../../pages/api/config";

// mrx : custom inside styles
const useStyles = makeStyles({
  containerSelect: {
    maxWidth: "50rem",
    backgroundColor: "#fafafa",
    position: "absolute",
    width: "100%",
    top: "7rem",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    padding: "20px",
    overflow: "scroll",
    height: "94vh"
  },
  mainSelectBoxItem: {
    position: "absolute",
    width: "100%",
    maxWidth: "50rem",
    top: "3rem",
    right: "50%",
    backgroundColor: "#fafafa",
    paddingTop: "2rem",
    transform: "translateX(50%)"
  },
  StepperBox: {
    direction: "rtl"
  },
  selectCategoryPic: {
    overflow: "hidden",
    width: "9rem",
    "& img": {
      width: "100%",
      heigth: "100%"
    }
  },
  RectangleBox: {
    padding: "2rem 1rem",
    // backgroundColor: theme.palette.primary.main,
    borderRadius: "1.5rem",
    color: "white",
    "& h4": {
      color: "white",
      textAlign: "center"
    }
  },
  circleBox: {
    // backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    border: `5px solid white`,
    width: "8rem",
    height: "8rem",
    right: " 50%",
    transform: "translateX(50%)",
    "& h5": {
      color: "white"
    }
  },
  NavBox: {
    marginTop: "2rem",
    "& li": {
      border: "1px solid #3f51b5",
      borderRadius: "1.5rem",
      padding: "0px 20px !important",
      boxShadow: "0px 0px 12px 0px #b2a7a645",
      "& svg": {
        color: "gray"
      }
    }
  }
});

const SelectCategoryScreenModal = ({
  setCategory,
  setShowSelectCategoryModal,
  onClose
}) => {
  const classes = useStyles();

  // mrx : states
  const [categorys, setCategorys] = useState();
  const [subCategorys, setSubCategorys] = useState();
  const [subCategorysChildrens, setSubCategorysChildrens] = useState();
  const [Loading, setLoading] = useState(true);
  const [SelectedCat, setSelectedCat] = useState(false);
  const [SelectedCatName, setSelectedCatName] = useState(false);

  useEffect(() => {
    GetUrl(GET_ALL_CATEGORY).then((res) => {
      if (res && res?.status === 200) {
        setCategorys(res?.data?.data);
        setLoading(false);
      }
    });
  }, []);

  const handleSubCat = (items) => {
    setSelectedCat(items?.id);
    setSelectedCatName(items?.name);
    if (!items?.childCategory?.length > 0) {
      setCategory({ id: items?.id, name: items?.name });
      setShowSelectCategoryModal(false);
    } else {
      let subCat = categorys.filter((item) => item?.id === items.id);
      setSubCategorys(subCat[0]?.childCategory);
    }
  };

  const handleSetCategory = (item) => {
    if (!(item.childCategory === null)) {
      if (item.childCategory?.length === 0) {
        setCategory({ id: item?.id, name: item?.name });
        setShowSelectCategoryModal(false);
      } else {
        setSubCategorysChildrens(item?.childCategory);
      }
    } else {
      setCategory({ id: item?.id, name: item?.name });
      setShowSelectCategoryModal(false);
    }
  };
  const handleSetCategorysChild = (item) => {
    if (!(item.childCategory === null)) {
      if (item.childCategory?.length === 0) {
        setCategory({ id: item?.id, name: item?.name });
        setShowSelectCategoryModal(false);
      } else {
        setSubCategorysChildrens(item?.childCategory);
      }
    } else {
      setCategory({ id: item?.id, name: item?.name });
      setShowSelectCategoryModal(false);
    }
  };

  return (
    <>
      <Container className={classes.containerSelect}>
        {Loading ? (
          <LoadingCategorie
            style={{
              position: "absolute",
              height: "600px"
            }}
          />
        ) : (
          ""
        )}
        {!subCategorysChildrens ||
        (subCategorysChildrens && subCategorysChildrens.length === 0) ? (
          !subCategorys ? (
            <>
              <Box component="ul" p={0} className={classes.NavBox}>
                {categorys &&
                  categorys
                    ?.filter((name) => name.parentId === null)
                    .map((item) => (
                      <Box
                        key={item?.id}
                        component="li"
                        display="flex"
                        alignItems="center"
                        mb={2}
                        justifyContent="space-between"
                        onClick={() => handleSubCat(item)}
                      >
                        <p
                          style={{
                            cursor: "pointer",
                            background: "transparent",
                            border: "none",
                            width: "100%",
                            outline: "none",
                            color: "black !important"
                          }}
                        >
                          {item?.name}
                        </p>

                        <ArrowBackIosIcon style={{ color: "#3f51b5" }} />
                      </Box>
                    ))}
              </Box>
            </>
          ) : (
            <>
              {" "}
              <Box component="ul" p={0} className={classes.NavBox}>
                <Box
                  onClick={() => {
                    setCategory({ id: SelectedCat, name: SelectedCatName });
                    setShowSelectCategoryModal(false);
                  }}
                  component="li"
                  display="flex"
                  alignItems="center"
                  mb={2}
                  justifyContent="space-between"
                >
                  <p
                    style={{
                      cursor: "pointer",
                      background: "transparent",
                      border: "none",
                      width: "100%",
                      outline: "none",
                      color: "black !important"
                    }}
                  >
                    انتخاب همه
                  </p>
                </Box>
                {subCategorys &&
                  subCategorys?.map((item) => (
                    <Box
                      key={item?.id}
                      onClick={() => handleSetCategory(item)}
                      component="li"
                      display="flex"
                      alignItems="center"
                      mb={2}
                      justifyContent="space-between"
                    >
                      <p
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: "none",
                          width: "100%",
                          outline: "none",
                          color: "black !important"
                        }}
                      >
                        {item?.name}
                      </p>
                      <ArrowBackIosIcon style={{ color: "#3f51b5" }} />
                    </Box>
                  ))}
              </Box>
            </>
          )
        ) : (
          ""
        )}

        {subCategorysChildrens && subCategorysChildrens.length > 0 ? (
          <Box component="ul" p={0} className={classes.NavBox}>
            {subCategorysChildrens?.map((item) => (
              <Box
                key={item?.id}
                onClick={() => handleSetCategorysChild(item)}
                component="li"
                display="flex"
                alignItems="center"
                mb={2}
                justifyContent="space-between"
              >
                <p
                  style={{
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                    width: "100%",
                    outline: "none",
                    color: "black !important"
                  }}
                >
                  {item?.name}
                </p>

                <ArrowBackIosIcon style={{ color: "#3f51b5" }} />
              </Box>
            ))}
          </Box>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

export default SelectCategoryScreenModal;

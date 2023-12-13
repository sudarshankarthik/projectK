const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");

const WidgetWrapper = styled(Box)(({ theme }) => ({
    padding: "1.5rem 1.5rem 0.575rem 1.5rem",
    backgroundColor: theme.palette.background.main,
    borderRadius: "0.75rem"
}))

export default WidgetWrapper
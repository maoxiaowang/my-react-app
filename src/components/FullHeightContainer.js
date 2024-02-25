import {Container} from "@mui/system";

const FullHeightContainer = ({element}) => {
    return (
        <Container
            style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh', // 设置最小高度为视口的高度
            }}
        >
            {element}
        </Container>
    );
}

export default FullHeightContainer;
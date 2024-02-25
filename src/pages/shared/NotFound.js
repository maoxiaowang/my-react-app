import {Container, Stack} from "@mui/system";
import Box from "@mui/material/Box";

const NotFound = () => {
  return (
      <Container>
          <Stack>
              <Box>
                  <h1>404 - Not Found</h1>
                  <p>Sorry, the page you are looking for might not exist.</p>
              </Box>
          </Stack>
      </Container>

  );
};

export default NotFound;
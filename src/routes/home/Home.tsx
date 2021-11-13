import ClearIcon from '@mui/icons-material/Clear';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';
import { BaseSyntheticEvent } from 'react-transition-group/node_modules/@types/react';
import { getAllCharacters } from '../../api/charactersApi';
import { CharactersContext } from '../../context/characters/characters-context';
const Home: FC<any> = (props) => {
  const charactersContext = useContext(CharactersContext);
  const navigate = useNavigate();
  const [filterTxt, setFilterTxt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // If we have all characters loaded, we avoid calling api again.
    // We can have 0 items if we enter the application for the first time
    // or we can have 1 item if we entered to a detail directly
    if (charactersContext.characters.length < 2) {
      setIsLoading(true);
      getAllCharacters()
        .then((res) => {
          try {
            charactersContext.setCharacters(res.data);
          } catch (error) {
            console.error('error');
            enqueueSnackbar(<FormattedMessage id="app.global.error" />, {
              variant: 'error',
            });
          }
        })
        .catch((errorGettingAllCharacters) => {
          console.error(errorGettingAllCharacters);
          enqueueSnackbar(<FormattedMessage id="api.get-characters.error" />, {
            variant: 'error',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (val: BaseSyntheticEvent) => {
    setFilterTxt(val.target.value);
  };

  const characters = useMemo(() => {
    return charactersContext.characters.filter((character) =>
      character.name.toLowerCase().includes(filterTxt.toLowerCase())
    );
  }, [filterTxt, charactersContext.characters]);

  const navigateToId = (id: number) => () => navigate(`/detail/${id}`);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <FormControl sx={{ mb: 4 }} variant="standard" fullWidth>
        <InputLabel htmlFor="filter">
          <FormattedMessage id="app.global.search" defaultMessage="Buscar" />
        </InputLabel>
        <Input
          data-testid="input-filter"
          id="filter"
          type={'text'}
          value={filterTxt}
          onChange={handleChange}
          disabled={isLoading}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                data-testid="input-remove-button"
                aria-label="toggle password visibility"
                onClick={() => setFilterTxt('')}
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {isLoading && (
        <div style={{ marginBottom: '1rem' }}>
          <Typography variant="overline">
            <FormattedMessage id="app.global.loading" />
          </Typography>
          <LinearProgress />
        </div>
      )}
      <Grid container spacing={4}>
        {characters.map((character) => (
          <Grid item key={character.nickname} xs={12} sm={6} md={4} lg={3}>
            <Card
              data-testid="home-character"
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <CardActionArea onClick={navigateToId(character.char_id)}>
                <CardMedia component="img" image={character.img} alt="random" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2">
                    {character.name}
                  </Typography>{' '}
                  <Typography
                    gutterBottom
                  >{`(${character.nickname})`}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" onClick={navigateToId(character.char_id)}>
                  <FormattedMessage id="app.global.view" />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;

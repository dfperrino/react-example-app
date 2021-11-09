import { ArrowBack, Refresh } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';
import { SxProps } from '@mui/system';
import { DateTime } from 'luxon';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { FormattedDate, FormattedList, FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router';
import { getCharacterById } from '../../api/charactersApi';
import { getRandomQuoteByAuthor } from '../../api/quotesApi';
import { CharactersContext } from '../../context/characters/characters-context';

const sloppedSx: SxProps = {
  width: '100%',
  paddingBottom: 'calc(80% - 64px)',
  clipPath: 'polygon(0 0, 100% 0%, 100% 84%, 0% 100%)',
  backgroundPosition: 'top',
};
const avatarStyles: SxProps = {
  width: 50,
  height: 50,
  border: '2px solid #fff',
  margin: '-96px 32px 0 auto',
  '& > img': {
    margin: 0,
  },
};
const contentStyles: SxProps = {
  padding: 6,
};
const centerBoxSx: SxProps = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
};

const Detail: FC<any> = (props) => {
  const characterContext = useContext(CharactersContext);
  const [isLoadingQuote, setIsLoadingQuote] = useState<boolean>(false);
  const [quote, setQuote] = useState<string | undefined>();
  const params = useParams();
  const navigate = useNavigate();

  const processedQuote = useMemo(() => {
    if (quote) {
      return quote;
    }
    return <FormattedMessage id="app.detail.quote.nonexistant" />;
  }, [quote]);

  const character = useMemo(() => {
    return characterContext.characters.find(
      (character) => character.char_id === Number(params.id)
    );
  }, [params.id, characterContext.characters]);

  const generateNewQuote = (name: string) => {
    setIsLoadingQuote(true);
    getRandomQuoteByAuthor(name)
      .then((getQuoteRes) => {
        try {
          setQuote(getQuoteRes.data[0].quote);
        } catch (errorSettingQuote) {
          setQuote(undefined);
        }
      })
      .catch((errorGettingQuote) => {
        console.error(errorGettingQuote);
        setQuote(undefined);
      })
      .finally(() => setIsLoadingQuote(false));
  };

  useEffect(() => {
    // if we have the character info in the context we don't call api, else, we call individual info
    if (!character) {
      getCharacterById(Number(params.id))
        .then((res) => {
          try {
            characterContext.setCharacters(res.data);
            generateNewQuote(res.data[0].name);
          } catch (errorSettingCharacter) {
            console.error(errorSettingCharacter);
          }
        })
        .catch((errorGettingCharacter) => {
          console.error(errorGettingCharacter);
        });
    } else if (character) {
      generateNewQuote(character.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);

  if (character) {
    return (
      <Card
        sx={{
          width: {
            xxs: '100%',
            md: '50%',
          },
          margin: '2rem auto',
        }}
      >
        <CardMedia
          data-testid="card-media-image"
          sx={sloppedSx}
          image={character?.img}
        />
        <Avatar src={character?.img} sx={avatarStyles} />
        <CardContent sx={contentStyles}>
          <Typography variant="h1" noWrap>
            {character?.name}
          </Typography>
          <Typography variant="overline">{character?.nickname}</Typography>
          <Divider variant="middle" sx={{ marginTop: 4, marginBottom: 4 }} />
          <Typography>
            <strong>
              <FormattedMessage id="app.detail.birthdate" />
            </strong>
            {' - '}
            {character.birthday !== 'Unknown' ? (
              <FormattedDate
                value={DateTime.fromFormat(
                  character.birthday,
                  'MM-dd-yyyy'
                ).toJSDate()}
              />
            ) : (
              <FormattedMessage id="app.detail.birthdate.unknown" />
            )}
          </Typography>
          <Typography>
            <strong>
              <FormattedMessage id="app.detail.occupation" />
            </strong>
            {' - '}
            <FormattedList value={character.occupation} />
          </Typography>
          <Typography>
            <strong>
              <FormattedMessage id="app.detail.status" />
            </strong>
            {' - '}
            {character.status}
          </Typography>
          <Typography>
            <strong>
              <FormattedMessage id="app.detail.portrayed" />
            </strong>
            {' - '}
            {character.portrayed}
          </Typography>
          <Typography>
            <strong>
              <FormattedMessage id="app.detail.quote" />
            </strong>
            {' - '}
            {isLoadingQuote ? <LinearProgress /> : processedQuote}
          </Typography>
        </CardContent>
        <Box px={2} pb={2} mt={-1}>
          <IconButton onClick={() => navigate('/')}>
            <ArrowBack />
          </IconButton>
          <IconButton onClick={() => generateNewQuote(character.name)}>
            <Refresh />
          </IconButton>
        </Box>
      </Card>
    );
  }
  return (
    <div style={{ display: 'flex' }}>
      <Box sx={centerBoxSx}>
        <CircularProgress data-testid="circular-progress" size={150} />
      </Box>
      <Box sx={centerBoxSx}>
        <Typography variant="caption" component="div" color="text.secondary">
          <FormattedMessage id="app.global.loading" defaultMessage="Cargando" />
        </Typography>
      </Box>
    </div>
  );
};

export default Detail;

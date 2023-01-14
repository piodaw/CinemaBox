const ResponseDictionary = {
  // main
  internalServerError: 'Wystąpił błąd serwera. Spróbuj ponownie później',
  // users
  usersError: 'Nie udało się pobrać danych użytkowników',
  userNotFound: 'Nie znaleziono użytkownika o podanym id',
  userCreated: 'Użytkownik został pomyślnie dodany',
  userNotCreated: 'Wystąpił błąd podczas dodawania użytkownika',
  userUpdated: 'Użytkownik został pomyślnie zaktualizowany',
  userNotUpdated: 'Wystąpił błąd podczas aktualizacji użytkownika',
  userDeleted: 'Użytkownik został pomyślnie usunięty',
  userNotDeleted: 'Wystąpił błąd podczas usuwania użytkownika',
  // movies
  moviesError: 'Nie udało się pobrać listy filmów',
  movieNotFound: 'Nie znaleziono filmu o podanym id',
  movieCreated: 'Film został pomyślnie dodany',
  movieNotCreated: 'Wystąpił błąd podczas dodawania filmu',
  movieUpdated: 'Film został pomyślnie zaktualizowany',
  movieNotUpdated: 'Wystąpił błąd podczas aktualizacji filmu',
  movieDeleted: 'Film został pomyślnie usunięty',
  movieNotDeleted: 'Wystąpił błąd podczas usuwania filmu',
  // showings
  showingsError: 'Nie udało się pobrać listy seansów',
  showingNotFound: 'Nie znaleziono seansu o podanym id',
  showingCreated: 'Seans został pomyślnie dodany',
  showingNotCreated: 'Wystąpił błąd podczas dodawania seansu',
  showingUpdated: 'Seans został pomyślnie zaktualizowany',
  showingNotUpdated: 'Wystąpił błąd podczas aktualizacji seansu',
  showingDeleted: 'Seans został pomyślnie usunięty',
  showingNotDeleted: 'Wystąpił błąd',
  // halls
  hallsError: 'Nie udało się pobrać listy sal',
  hallNotFound: 'Nie znaleziono sali o podanym id',
  hallCreated: 'Sala została pomyślnie dodana',
  hallNotCreated: 'Wystąpił błąd podczas dodawania sali',
  hallUpdated: 'Sala została pomyślnie zaktualizowana',
  hallNotUpdated: 'Wystąpił błąd podczas aktualizacji sali',
  hallDeleted: 'Sala została pomyślnie usunięta',
  hallNotDeleted: 'Wystąpił błąd podczas usuwania sali',
  // repertoire
  repertoireError: 'Nie udało się pobrać listy repertuarów',
  repertoireNotFound: 'Nie znaleziono repertuaru o podanym id',
  repertoireCreated: 'Repertuar został pomyślnie dodany',
  repertoireNotCreated: 'Wystąpił błąd podczas dodawania repertuaru',
  repertoireUpdated: 'Repertuar został pomyślnie zaktualizowany',
  repertoireNotUpdated: 'Wystąpił błąd podczas aktualizacji repertuaru',
  repertoireDeleted: 'Repertuar został pomyślnie usunięty',
  repertoireNotDeleted: 'Wystąpił błąd podczas usuwania repertuaru',
  // tickets
  ticketsError: 'Nie udało się pobrać listy biletów',
  ticketNotFound: 'Nie znaleziono biletu o podanym id',
  ticketCreated: 'Bilet został pomyślnie dodany',
  ticketNotCreated: 'Wystąpił błąd podczas dodawania biletu',
  ticketUpdated: 'Bilet został pomyślnie zaktualizowany',
  ticketNotUpdated: 'Wyśpił błąd podczas aktualizacji biletu',
  ticketDeleted: 'Bilet został pomyślnie usunięty',
  ticketNotDeleted: 'Wyśpił błąd podczas usuwania biletu',
  // reservations
  reservationsError: 'Nie udało się pobrać listy rezerwacji',
  reservationNotFound: 'Nie znaleziono rezerwacji o podanym id',
  reservationCreated: 'Rezerwacja została pomyślnie dodana',
  reservationNotCreated: 'Wystąpił błąd podczas dodawania rezerwacji',
  reservationUpdated: 'Rezerwacja została pomyślnie zaktualizowana',
  reservationNotUpdated: 'Wystąpił błąd podczas aktualizacji rezerwacji',
  reservationDeleted: 'Rezerwacja została pomyślnie usunięta',
  reservationNotDeleted: 'Wystąpił błąd podczas usuwania rezerwacji',
  // promocode
  promocodesError: 'Nie udało się pobrać listy kodów rabatowych',
  promocodeNotFound: 'Nie znaleziono kodu rabatowego o podanym id',
  promocodeCreated: 'Kod rabatowy został pomyślnie dodany',
  promocodeNotCreated: 'Wystąpił błąd podczas dodawania kodu rabatowego',
  promocodeUpdated: 'Kod rabatowy został pomyślnie zaktualizowan',
  promocodeNotUpdated: 'Wystąpił błąd podczas aktualizacji kodu rabatowego',
  promocodeDeleted: 'Kod rabatowy został pomyślnie usunięty',
  promocodeNotDeleted: 'Wystąpił błąd podczas usuwania kodu rabatowego',
} as const

export default ResponseDictionary

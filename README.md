# [Kagoole](https://kagoole.herokuapp.com)
Search [Kaggle](https://www.kaggle.com) competition and solution.

Solution is manual registration, so please share your solution.

## Requirements
- Heroku
    - PostgreSQL
- Credit card
    - It does not take money, to use Heroku addons
- Kaggle API
- Slack

### Backend
- Python 3.6
- Pipenv

### Frontend
- npm
- Yarn

## Run on local using Heroku PostgreSQL
1. Clone this repository.
```
$ git clone https://github.com/Doarakko/kagoole
```

### Backend
1. Set
```
$ cd backend
$ pipenv shell
$ pipenv install
```

2. Heroku setting
- Create Heroku application
```
$ heroku create <your app name>
```
- Add addons
```
$ heroku addons:create heroku-postgresql
```

3. Set environment variables
- `kagoole/backend/.env`

Please refer to `kagoole/backend/.env.example`.  
`DATABASE_URL` is got using this command.
```
$ heroku config
```
If you don't need to notify slack when solution is deleted, please comment out this method.  
And Slack is unnecessary.
- `kagoole/backend/kagoole/models.py`
```
# def delete(self, *args, **kwargs):
#     super().delete(*args, **kwargs)

#     value = '{}\nRank {} {}\n{}'.format(
#         self.competition, self.rank, self.medal, self.url)
#     post_slack(title='Solution is deleted', value=value)
```

4. Migrate
```
$ python manage.py makemigrations kagoole
$ python manage.py migrate
```

5. Initialize competitions
```
$ python manage.py runscript starter
```

6. Run API server on local
```
$ python manage.py runserver
```
Access to `http://localhost:8000`.

### Frontend
1. Set

```
$ cd frontend
$ yarn install
```

2. Change API URL to localhost
- `kagoole/frontend/src/url.js`
```
export const api = "http://localhost:8000";
``` 

3. Run on local
```
$ yarn start
```
Access to `http://localhost:3000`.


## Contribution
Welcome issue and pull request.

## License
MIT

## Author
Doarakko


from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

UserModel = get_user_model()


def custom_validation(data):

    errors = {'errors': {}}

    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()

    if not email:
        errors['errors']['email'] = 'Email is required.'
    if UserModel.objects.filter(email=email).exists():
        errors['errors']['email'] = 'Email is already taken.'

    if not username:
        errors['errors']['username'] = 'Username is required.'

    if not password or len(password) < 8:
        errors['errors']['length'] = 'Password must be at least 8 characters long.'
    if not any(char.isdigit() for char in password):
        errors['errors']['numeric'] = 'Password must contain at least 1 number.'
    if not any(char.isupper() for char in password):
        errors['errors']['upper'] = 'Password must contain at least 1 uppercase character.'
    if not any(char.islower() for char in password):
        errors['errors']['lower'] = 'Password must contain at least 1 lowercase character.'

    if errors['errors']:
        return errors
    else:
        return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('Email is required.')


def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('Password is needed')
    return True
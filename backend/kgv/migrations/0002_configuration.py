# Generated by Django 3.1.1 on 2020-09-10 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kgv', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Configuration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(help_text='A unique key with the configuration entry name', max_length=100, unique=True)),
                ('description', models.TextField(default='', help_text='Further optional description of the configuration entry')),
                ('value', models.CharField(default='', help_text='The value of the configuration entry', max_length=200)),
            ],
        ),
    ]
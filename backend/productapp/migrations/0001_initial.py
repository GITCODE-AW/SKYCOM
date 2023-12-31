# Generated by Django 5.0 on 2023-12-24 13:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=15)),
                ('heading', models.CharField(max_length=15)),
                ('starting_price', models.PositiveIntegerField()),
                ('image_link', models.CharField(max_length=500)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='productapp.category')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=200)),
                ('product_rating', models.PositiveSmallIntegerField(default=0)),
                ('maximum_price', models.PositiveIntegerField()),
                ('price', models.PositiveIntegerField()),
                ('description', models.TextField(max_length=500)),
                ('dod_stat', models.BooleanField(default=False)),
                ('fsale_stat', models.BooleanField(default=False)),
                ('featured_stat', models.BooleanField(default=False)),
                ('image_link', models.CharField(max_length=500)),
                ('alt_image_link', models.CharField(max_length=500)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='productapp.category')),
            ],
        ),
    ]

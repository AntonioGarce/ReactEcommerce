# Generated by Django 4.2.1 on 2023-06-01 21:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_alter_product_price'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shippingaddress',
            old_name='contry',
            new_name='country',
        ),
    ]

# Generated by Django 4.2.3 on 2024-02-21 15:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecomm', '0005_remove_order_shippingprice_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to=''),
        ),
    ]

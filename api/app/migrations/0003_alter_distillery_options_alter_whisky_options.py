# Generated by Django 4.2.7 on 2023-12-17 18:57

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0002_auto_20231217_1703"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="distillery",
            options={"verbose_name_plural": "Distilleries"},
        ),
        migrations.AlterModelOptions(
            name="whisky",
            options={"verbose_name_plural": "Whiskies"},
        ),
    ]
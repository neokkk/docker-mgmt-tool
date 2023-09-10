# Generated by Django 4.2.3 on 2023-07-27 12:14

from django.db import migrations, models
import docker_mgmt.remotes.ansible
import docker_mgmt.remotes.setup


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AnsibleRole',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('path', models.CharField(max_length=250, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
            bases=(models.Model, docker_mgmt.remotes.ansible.Role),
        ),
        migrations.CreateModel(
            name='Server',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hostname', models.CharField(help_text='alias로 사용할 서버 이름', max_length=200, unique=True)),
                ('ip_address', models.CharField(help_text='서버의 IP 주소 혹은 도메인 이름', max_length=200)),
                ('cpu', models.JSONField(blank=True, help_text='CPU 정보', null=True)),
                ('memory_total', models.IntegerField(blank=True, help_text='총 메모리 용량 (KB)', null=True)),
                ('disks', models.JSONField(blank=True, help_text='디스크 정보', null=True)),
                ('labels', models.CharField(default='', max_length=200)),
                ('roles', models.ManyToManyField(blank=True, null=True, to='baremetal.ansiblerole')),
            ],
            bases=(models.Model, docker_mgmt.remotes.setup.Server),
        ),
    ]

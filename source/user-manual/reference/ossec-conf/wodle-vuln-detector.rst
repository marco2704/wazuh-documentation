.. Copyright (C) 2019 Wazuh, Inc.

.. _wodle_vuln_detector:

wodle name="vulnerability-detector"
====================================

.. versionadded:: 3.2.0

.. topic:: XML section name

  .. code-block:: xml

    <wodle name="vulnerability-detector">
    </wodle>

Configuration options of the Vulnerability detector wodle.

Options
-------

- `disabled`_
- `interval`_
- `run_on_start`_
- `ignore_time`_
- `feed`_

.. note:: Since Wazuh 3.5 the options ``update_ubuntu_oval`` and ``update_redhat_oval`` are deprecated. It is recommended to use ``feed`` instead.

+---------------------------+-----------------------------+
| Options                   | Allowed values              |
+===========================+=============================+
| `disabled`_               | yes, no                     |
+---------------------------+-----------------------------+
| `interval`_               | A positive number (seconds) |
+---------------------------+-----------------------------+
| `run_on_start`_           | yes, no                     |
+---------------------------+-----------------------------+
| `ignore_time`_            | A positive number (seconds) |
+---------------------------+-----------------------------+
| `feed`_                   | An update configuration     |
+---------------------------+-----------------------------+


disabled
^^^^^^^^

Disable the Vulnerability detector wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

interval
^^^^^^^^

Time between vulnerabilities detections.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 5m                                                                                                                                       |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes), h (hours) or d (days).        |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+

run_on_start
^^^^^^^^^^^^

Runs updates and detections immediately when service is started.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

ignore_time
^^^^^^^^^^^^

Time during which vulnerabilities that have already been alerted will be ignored.

+----------------------+------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**    | 6 hours                                                                                                                            |
+----------------------+------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values**   | A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes), h (hours) or d (days).  |
+----------------------+------------------------------------------------------------------------------------------------------------------------------------+

feed
^^^^^

Configuration block to specify vulnerability updates. Each feed has the tag **name**, this tag tells Vulnerability detector about the OS.  

+------------------+---------------------------------------------+
| **OS**           | **Value**                                   |
+------------------+---------------------------------------------+
| Ubuntu           | ubuntu-12, ubuntu-14, ubuntu-16, ubuntu-18  |
+------------------+---------------------------------------------+
| Red Hat 5/6/7,   |                                             |
| CentOS 5/6/7,    | redhat                                      |
| Amazon Linux 1/2 |                                             |
+------------------+---------------------------------------------+
| Debian           | debian-7, debian-8, debian-9                |
+------------------+---------------------------------------------+

Example:

.. code-block:: xml

  <feed name="ubuntu-18">
    ...
  </feed>

Each *feed* has it own options, here you can see the allowed options:

+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  | Disable the update configuration.                                                                                                                                                                                                               |
| disabled         +--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  | **Allowed values** | yes, no                                                                                                                                                                                                                    |
+------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  | How often the vulnerability database is updated.                                                                                                                                                                                                |
|                  +--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| update_interval  | **Default value**  | 1 hour.                                                                                                                                                                                                                    |
|                  +--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  | **Allowed values** | A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes), h (hours) or d (days).                                                                                          |
+------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  | Link to an alternative OVAL file.                                                                                                                                                                                                               |
|                  +--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  | **Allowed values** | Links to feed DB obtained from `Red Hat API <https://access.redhat.com/labsinfo/securitydataapi>`_, `Canonical <https://people.canonical.com/~ubuntu-security/oval>`_ or `Debian <https://www.debian.org/security/oval>`_. |
| url              +--------------------+--------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  |                    |        | Server port where the OVAL file is located.                                                                                                                                                                       |
|                  | **Allowed tags**   | port   +--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  |                    |        | **Allowed values** | Any valid port. Default is 443.                                                                                                                                                              |
+------------------+--------------------+--------+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  | Path to an alternative OVAL file.                                                                                                                                                                                                               |
| path             +--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  | **Allowed values** | Path to OVAL file obtained from `Red Hat <https://www.redhat.com/security/data/oval>`_, `Canonical <https://people.canonical.com/~ubuntu-security/oval>`_ or `Debian <https://www.debian.org/security/oval>`_.             |
+------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  | Allows you to use the vulnerability database with agents with different operating system.                                                                                                                                                       |
| allow            +--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  | **Allowed values** | List of operating systems that will allow the use of this OVAL. Example: "linux mint-12, ubuntu-17".                                                                                                                       |
+------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  | Only for Red Hat. The feed will be updated from this year.                                                                                                                                                                                      |
|                  +--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| update_from_year | **Default value**  | 2010                                                                                                                                                                                                                       |
|                  +--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                  | **Allowed values** | A valid year and greater than 1998.                                                                                                                                                                                        |
+------------------+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Example of configuration
------------------------

The following configuration allows you to use the vulnerability database for Debian 9, Red Hat (since 2018) and Ubuntu 18 agents. It also allows you to extract vulnerabilities from agents with Linux Mint 18.X and Ubuntu 17.X using the Ubuntu 18 vulnerability database.

.. code-block:: xml

  <wodle name="vulnerability-detector">
    <disabled>yes</disabled>
    <interval>5m</interval>
    <ignore_time>6h</ignore_time>
    <run_on_start>yes</run_on_start>
    <feed name="ubuntu-18">
      <disabled>no</disabled>
      <update_interval>1h</update_interval>
      <allow>linux mint-18, ubuntu-17</allow>
    </feed>
    <feed name="redhat">
      <disabled>no</disabled>
      <update_interval>1h</update_interval>
      <update_from_year>2014</update_from_year>
    </feed>
    <feed name="debian-9">
      <disabled>no</disabled>
      <update_interval>1h</update_interval>
    </feed>
  </wodle>

.. note:: See the :doc:`Vulnerability detector section<../../capabilities/vulnerability-detection>` to obtain more information about this module.

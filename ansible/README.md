# On-Prem Local Ansible Demo

This is a simple Ansible demo to showcase local execution on an on-premises setup.

## Files

- `site.yml`: The main playbook.
- `inventory`: Inventory file with localhost defined.
- `ansible.cfg`: Configuration file for Ansible.

## How to Run

1. Ensure Ansible is installed on your system.
2. Navigate to the `ansible` directory.
3. Run the playbook:

   ```bash
   ansible-playbook site.yml
   ```

This will create a demo file at `/tmp/demo_file.txt` and install the `tree` package.

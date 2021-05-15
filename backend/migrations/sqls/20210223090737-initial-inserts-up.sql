INSERT INTO lattics.`role` (id, name) VALUES (1, 'admin');
INSERT INTO lattics.`role` (id, name) VALUES (2, 'user');
INSERT INTO lattics.`user` (id, email, password, name, active, organization_id, role_id) VALUES (2, 'admin@admin.com', MD5('admin'), 'Administrator', '1', NULL, 1);

ALTER TABLE lattics.simulation MODIFY COLUMN simulation_batch_id int NULL;

INSERT INTO lattics.simulation_status (id,status) VALUES (1,"SCHEDULED");
INSERT INTO lattics.simulation_status (id,status) VALUES (2,"RUNNING");
INSERT INTO lattics.simulation_status (id,status) VALUES (3,"PAUSED");
INSERT INTO lattics.simulation_status (id,status) VALUES (4,"FINISHED");
INSERT INTO lattics.simulation_status (id,status) VALUES (5,"CANCELLED");
INSERT INTO lattics.simulation_status (id,status) VALUES (6,"ERROR");
